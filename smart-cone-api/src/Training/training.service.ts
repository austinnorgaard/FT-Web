import { Injectable } from "@nestjs/common";
import { TrainingSessionSetup } from "./training-session-setup";
import { AthleteSession } from "./athlete-session";
import { Segment } from "./segment";
import { FieldConesService } from "../FieldCones/field-cones.service";
import { Subject } from "rxjs";
import { FrontEndCommunicator } from "../FrontEndComms/front-end-communicator.service";
import { Athlete } from "../Athletes/athlete";
import { UltrasonicService } from "../Ultrasonic/ultrasonic.service";
import { BaseUltrasonicService } from "../Ultrasonic/base-ultrasonic.service";

@Injectable()
export class TrainingService {
    sessionState: Subject<AthleteSession[]> = new Subject<AthleteSession[]>();
    private athleteSessions: AthleteSession[] = [];

    constructor(
        private fieldCones: FieldConesService,
        private readonly frontEndComms: FrontEndCommunicator,
        private readonly ultraSonicService: BaseUltrasonicService,
    ) {
        this.fieldCones.onTilt.subscribe(cone => {
            // tilt has occurred, modify our athletes session state, then re-emit if its changed
            console.log(`Tilt occured from cone with info: ${JSON.stringify(cone)}`);

            // we assume the athletes are in the correct order, so we simply find the next athlete
            // in the list for which they haven't completed the cone which gave us the tilt event

            // TODO: Obviously more validation here..

            // Get the first athlete in the list which hasn't completed this cone
            // only include athletes which have actually started to reduce any false positives
            const athletes = this.athleteSessions.filter(session => {
                return session.started && session.segments.find(segment => segment.to === cone.id).completed === false;
            });
            if (athletes.length === 0) {
                console.log("This shouldn't happen. A tilt occured for a cone for which no athletes were meant to be running (already completed).");
                console.log(this.athleteSessions);
                return;
            }

            athletes[0].segments.find(s => s.to === cone.id).completed = true;
            // set the stop time for this segment
            athletes[0].segments.find(s => s.to === cone.id).endTime = new Date();

            // update the frontend with the new state
            this.sessionState.next(this.athleteSessions);
        });

        this.sessionState.subscribe(sessionState => {
            this.frontEndComms.frontEndSocket.emit("sessionStateChanged", { items: sessionState });
        });
    }

    async startSession(sessionSetupData: TrainingSessionSetup): Promise<void> {
        this.buildSessions(sessionSetupData);
        console.log("Sessions built!");
        console.log(`${JSON.stringify(this.athleteSessions)}`);
        this.sessionState.next(this.athleteSessions);
    }

    private buildSessions(sessionSetupData: TrainingSessionSetup) {
        this.athleteSessions = []; // reset if needed

        sessionSetupData.athletes.forEach(athlete => {
            const session = new AthleteSession(athlete, [], false);

            // Add the segments for this athlete
            sessionSetupData.course.segments.forEach(segment => {
                session.segments.push({
                    from: segment.from,
                    to: segment.to,
                    action: segment.action,
                    completed: false,
                } as Segment);
            });

            this.athleteSessions.push(session);
        });
    }

    async nextAthleteStarting(): Promise<boolean> {
        // User has sent the next athlete into the system --
        // This is the first athlete in the list which isn't marked as started.
        // Mark them started and note their start time for the first segment
        return this.markNextAthleteStarted();
    }

    // Marks the first athlete found in the list which hasn't started as started
    // Also sets the time for the athletes start time
    private markNextAthleteStarted(): boolean {
        // Do nothing if there are no more athletes left to start
        if (this.numAthletesRemainingToStart() <= 0) {
            console.log("Frontend wanted to send another athlete, but there are none left!!");
            return false;
        }
        const athleteSession = this.athleteSessions.find(a => a.started !== true);
        athleteSession.started = true;
        athleteSession.segments[0].startTime = new Date(); // DateTime.Now()

        console.log(
            `Athlete ${athleteSession.athlete.firstName} ${athleteSession.athlete.lastName} has started the course at ${
                athleteSession.segments[0].startTime
            }. There are ${this.numAthletesRemainingToStart()} athletes remaining!`,
        );

        // finally emit the new state
        this.sessionState.next(this.athleteSessions);

        return true;
    }

    private numAthletesRemainingToStart(): number {
        return this.athleteSessions.filter(s => !s.started).length;
    }
}
