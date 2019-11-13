import { Injectable, HttpService } from "@nestjs/common";
import { TrainingSessionSetup } from "./training-session-setup";
import { AthleteSession, AthleteSessionArray, SegmentArray, AthleteSessionCollection } from "./athlete-session";
import { Segment } from "./segment";
import { FieldConesService } from "../FieldCones/field-cones.service";
import { Subject } from "rxjs";
import { FrontEndCommunicator } from "../FrontEndComms/front-end-communicator.service";
import { Athlete } from "../Athletes/athlete";
import { UltrasonicService } from "../Ultrasonic/ultrasonic.service";
import { BaseUltrasonicService } from "../Ultrasonic/base-ultrasonic.service";
import { SessionSchema } from "../Database/Models/SessionSchema";
import { SessionResultSchema } from "../Database/Models/SessionResultSchema";
import { AthleteSchema } from "../Database/Models/AthleteSchema";
import { SegmentResultSchema } from "../Database/Models/SegmentResultSchema";
import { SessionResultCollection } from "./session-results";
import { TrainingSessionState } from "./training-session-state";

@Injectable()
export class TrainingService {
    sessionState = new Subject<TrainingSessionState>();
    //private athleteSessions: AthleteSessionArray = new AthleteSessionArray();
    public trainingSessionState: TrainingSessionState = new TrainingSessionState();
    private segmentCollectionIndex: number = 0;

    private sessionResults: SessionResultCollection = undefined;

    constructor(
        private fieldCones: FieldConesService,
        private readonly frontEndComms: FrontEndCommunicator,
        private readonly ultraSonicService: BaseUltrasonicService,
        private http: HttpService,
    ) {
        this.fieldCones.onTilt.subscribe(cone => {
            // tilt has occurred, modify our athletes session state, then re-emit if its changed
            console.log(`Tilt occured from cone with info: ${JSON.stringify(cone)}`);

            this.handleConeHit(cone.id);
        });

        this.sessionState.subscribe((sessionState: TrainingSessionState) => {
            this.frontEndComms.frontEndSocket.emit("sessionStateChanged", sessionState);
        });

        this.ultraSonicService.UltrasonicEvent.subscribe(event => {
            // we treat ultra sonic events as the cone with id #0 emitting, as this is
            // the smart cone's ID. We do the same procedure for regular tilts, but with
            // the special cone ID of #1
            this.handleConeHit(0);
        });
    }

    handleConeHit(id: number) {
        // early outs
        if (!this.trainingSessionState.getCurrentSession()) {
            return;
        }

        console.log(`Handling cone hit for id ${id}`);
        // we assume the athletes are in the correct order, so we simply find the next athlete
        // in the list for which they haven't completed the cone which gave us the tilt event

        // TODO: Obviously more validation here..

        // Get the first athlete in the list which hasn't completed this cone
        // only include athletes which have actually started to reduce any false positives
        const athletes = this.trainingSessionState.getCurrentSession().athleteSessions.filter(session => {
            // handle cases where the passed in ID is not a valid ID at all
            if (session.started) {
                const seg = session.segments.find(s => s.to === id);
                return seg && seg.completed === false;
            }
            return false;
        });
        if (athletes.length === 0) {
            console.log("This shouldn't happen. A tilt occured for a cone for which no athletes were meant to be running (already completed).");
            console.log(this.trainingSessionState);
            return;
        }

        const segment = athletes[0].segments.find(s => s.to === id);
        const segmentIdx = athletes[0].segments.findIndex(s => s.to === id);
        // Do not continue if the previous segment was not completed. This typically means a cone was
        // erroneously triggered even though no one was moving toward it

        // I think this is probably not valid, but to be safe..
        if (segmentIdx !== 0) {
            // Get the previous cone:
            const prevSegment = athletes[0].segments[segmentIdx - 1];
            if (!prevSegment.completed) {
                console.log('Previous segment was not completed, assuming this was an accidental trigger!');
                return;
            }
        } else {
            console.log("WARN: segmentIdx is 0! This is probably not expected!");
        }

        segment.completed = true;
        // set the stop time for this segment
        console.log("Setting end time..");
        segment.endTime = new Date();

        // calculate the duration so its easier to consume later
        segment.duration = segment.endTime.getTime() - segment.startTime.getTime();

        // next need to update the starting time of the next segment, if it exists
        // it'll be the segment in which the "from" cone is the one we're handling now
        // skip if we're handling cone id 0
        if (id !== 0) {
            athletes[0].segments.find(s => s.from === id).startTime = new Date();
        }

        // update the frontend with the new state
        this.sessionState.next(this.trainingSessionState);

        // Check if this was the final cone hit (session over)
        if (this.sessionComplete()) {
            // Check if we are totally done
            if (this.allSessionsComplete()) {
                // let the frontend know
                this.frontEndComms.frontEndSocket.emit("sessionComplete", this.trainingSessionState);
                return;
            }

            // Otherwise, increment the session
            this.trainingSessionState.sessionNum = this.trainingSessionState.sessionNum + 1;
            this.sessionState.next(this.trainingSessionState);
        }
    }

    private sessionComplete(): boolean {
        // We are done when all segments are marked as complete
        return this.trainingSessionState.getCurrentSession().athleteSessions.every(session => {
            return session.segments.every(segment => segment.completed);
        });
    }

    private allSessionsComplete(): boolean {
        // we done if we are on the final session and its complete
        if (this.trainingSessionState.sessionNum + 1 === this.trainingSessionState.athleteSessions.sessions.length) {
            return true;
        }

        return false;
    }

    async startSession(sessionSetupData: TrainingSessionSetup): Promise<void> {
        this.buildSessions(sessionSetupData);
        this.setConeActions(sessionSetupData);
        this.sessionState.next(this.trainingSessionState);
    }

    private async setConeActions(sessionSetupData: TrainingSessionSetup) {
        // Let every field cone know what action they should be emitting
        // when they are tilted
        const cones = this.fieldCones.connectedFieldCones.getValue();

        const promises = cones.map(cone => {
            const action = sessionSetupData.course.segmentCollection[this.segmentCollectionIndex].segments.find(s => s.from === cone.id).action;

            const url = `http://${cone.ip}:6200/audio/audio-file`;
            // tslint:disable-next-line:object-literal-shorthand
            return this.http.post(url, { action: action }).toPromise();
        });
        try {
            await Promise.all(promises);
        } catch (err) {
            console.log(`Failed to update audio actins. Error: ${err}`);
        }
    }

    private buildSessions(sessionSetupData: TrainingSessionSetup) {
        this.trainingSessionState = new TrainingSessionState(); // reset if needed
        let i = 0;
        console.log(sessionSetupData);
        sessionSetupData.course.segmentCollection.forEach(segmentCollection => {
            this.trainingSessionState.athleteSessions.sessions.push(new AthleteSessionCollection());
            sessionSetupData.athletes.forEach(athlete => {
                const session = new AthleteSession(athlete, [], false);

                // Add the segments for this athlete
                segmentCollection.segments.forEach(segment => {
                    session.segments.push({
                        from: segment.from,
                        to: segment.to,
                        action: segment.action,
                        completed: false,
                    } as Segment);
                });

                this.trainingSessionState.athleteSessions.sessions[i].athleteSessions.push(session);
            });
            i++;
        });

        console.log("After build sessions: ", this.trainingSessionState);
    }

    async nextAthleteStarting(): Promise<boolean> {
        // User has sent the next athlete into the system --
        // This is the first athlete in the list which isn't marked as started.
        // Mark them started and note their start time for the first segment
        return this.markNextAthleteStarted();
    }

    async saveResults(): Promise<any> {
        let num = 0;
        this.trainingSessionState.athleteSessions.sessions.forEach(session => {
            this.saveSession(num);
            num++;
        });
    }

    private async saveSession(sessionNum: number) {
        console.log("Saving session results");

        let athleteSessions = this.trainingSessionState.athleteSessions.sessions[sessionNum];

        const session = new SessionSchema();
        session.startTime = new Date(); // FIXME
        session.fieldInfo = "Some Field Info here!";
        session.courseInfo = "Some Course Info Here!";
        const newSession = await session.save();

        // fill out the session results, 1 per athlete
        athleteSessions.athleteSessions.forEach(async athleteSession => {
            const sessionResult = new SessionResultSchema();
            sessionResult.athleteId = athleteSession.athlete.id;
            sessionResult.sessionId = newSession.id;
            const newSessionResult = await sessionResult.save();
            // find the athlete for the session we are looking for
            try {
                // need to add all segments for this athlete
                athleteSession.segments.forEach(async segment => {
                    const segmentResult = new SegmentResultSchema();
                    segmentResult.duration = segment.duration;
                    segmentResult.action = segment.action;
                    segmentResult.sessionResultId = newSessionResult.id;
                    await segmentResult.save();
                    console.log("Added a segment...");
                });
            } catch (err) {
                console.log(`Could not find correct athlete in database with id: ${athleteSession.athlete.id}! Giving up!!`);
                throw err;
            }
        });
        try {
        } catch (err) {
            console.log(`Error saving overall session results. Err: ${err}`);
            throw err;
        }
        return true;
    }

    // Marks the first athlete found in the list which hasn't started as started
    // Also sets the time for the athletes start time
    private markNextAthleteStarted(): boolean {
        // Do nothing if there are no more athletes left to start
        if (this.numAthletesRemainingToStart() <= 0) {
            console.log("Frontend wanted to send another athlete, but there are none left!!");
            return false;
        }
        const athleteSession = this.trainingSessionState.getCurrentSession().athleteSessions.find(a => a.started !== true);
        athleteSession.started = true;
        athleteSession.segments[0].startTime = new Date(); // DateTime.Now()

        console.log(
            `Athlete ${athleteSession.athlete.firstName} ${athleteSession.athlete.lastName} has started the course at ${
                athleteSession.segments[0].startTime
            }. There are ${this.numAthletesRemainingToStart()} athletes remaining!`,
        );

        // finally emit the new state
        this.sessionState.next(this.trainingSessionState);

        return true;
    }

    private numAthletesRemainingToStart(): number {
        return this.trainingSessionState.getCurrentSession().athleteSessions.filter(s => !s.started).length;
    }
}
