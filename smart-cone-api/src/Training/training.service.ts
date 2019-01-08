import { Injectable } from "@nestjs/common";
import { TrainingSessionSetup } from "./training-session-setup";
import { AthleteSession } from "./athlete-session";
import { Segment } from "./segment";

@Injectable()
export class TrainingService {
    private athleteSessions: AthleteSession[] = [];
    async startSession(sessionSetupData: TrainingSessionSetup): Promise<void> {
        this.buildSessions(sessionSetupData);
        console.log("Sessions built!");
        console.log(this.athleteSessions);
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
                } as Segment);
            });

            this.athleteSessions.push(session);
        });
    }
}
