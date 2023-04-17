"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const athlete_session_1 = require("./athlete-session");
class TrainingSessionState {
    constructor(sessionNum, athleteSessions) {
        this.sessionNum = sessionNum;
        this.athleteSessions = athleteSessions;
        this.sessionNum = 0;
        this.athleteSessions = new athlete_session_1.AthleteSessionArray();
    }
    getCurrentSession() {
        return this.athleteSessions.sessions[this.sessionNum];
    }
}
exports.TrainingSessionState = TrainingSessionState;
//# sourceMappingURL=training-session-state.js.map