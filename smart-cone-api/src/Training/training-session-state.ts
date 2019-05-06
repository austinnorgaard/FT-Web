import { AthleteSessionArray, AthleteSessionCollection } from "./athlete-session";

export class TrainingSessionState {
    public constructor(public sessionNum?: number, public athleteSessions?: AthleteSessionArray) {
        this.sessionNum = 0;
        this.athleteSessions = new AthleteSessionArray();
    }

    getCurrentSession(): AthleteSessionCollection {
        return this.athleteSessions.sessions[this.sessionNum];
    }
}
