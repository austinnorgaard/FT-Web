import { Injectable } from "@nestjs/common";
import { TrainingSessionSetup } from "./training-session-setup";
import { AthleteSession } from "./athlete-session";
import { Segment } from "./segment";
import { FieldConesService } from "../FieldCones/field-cones.service";
import { Subject } from "rxjs";

@Injectable()
export class TrainingService {
    sessionState: Subject<AthleteSession[]> = new Subject<AthleteSession[]>();
    private athleteSessions: AthleteSession[] = [];

    constructor(private fieldCones: FieldConesService) {
        this.fieldCones.onTilt.subscribe(cone => {
            // tilt has occurred, modify our athletes session state, then re-emit if its changed
            console.log(`Tilt occured from cone with info: ${JSON.stringify(cone)}`);

            // we assume the athletes are in the correct order, so we simply find the next athlete
            // in the list for which they haven't completed the cone which gave us the tilt event

            // TODO: Obviously more validation here..

            // Get the first athlete in the list which hasn't completed this cone
            const athletes = this.athleteSessions.filter(session => session.segments.find(segment => segment.to === cone.id).completed === false);
            if (athletes.length === 0) {
                console.log("This shouldn't happen. A tilt occured for a cone for which no athletes were meant to be running (already completed).");
                return;
            }

            athletes[0].segments.find(s => s.to === cone.id).completed = true;
            console.log(athletes[0]);
        });
    }

    async startSession(sessionSetupData: TrainingSessionSetup): Promise<void> {
        this.buildSessions(sessionSetupData);
        console.log("Sessions built!");
        this.sessionState.next(this.athleteSessions);
    }

    private buildSessions(sessionSetupData: TrainingSessionSetup) {
        this.athleteSessions = []; // reset if needed

        sessionSetupData.athletes.forEach(athlete => {
            const session = {
                athlete,
                segments: [],
            } as AthleteSession;

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
}
