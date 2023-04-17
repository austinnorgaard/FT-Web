"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const athlete_session_1 = require("./athlete-session");
const field_cones_service_1 = require("../FieldCones/field-cones.service");
const rxjs_1 = require("rxjs");
const front_end_communicator_service_1 = require("../FrontEndComms/front-end-communicator.service");
const base_ultrasonic_service_1 = require("../Ultrasonic/base-ultrasonic.service");
const SessionSchema_1 = require("../Database/Models/SessionSchema");
const SessionResultSchema_1 = require("../Database/Models/SessionResultSchema");
const SegmentResultSchema_1 = require("../Database/Models/SegmentResultSchema");
const training_session_state_1 = require("./training-session-state");
const base_tilt_service_1 = require("../Tilt/base-tilt-service");
const base_audio_service_1 = require("../Audio/base-audio.service");
let TrainingService = class TrainingService {
    constructor(fieldCones, frontEndComms, ultraSonicService, http, localTiltService, audioService) {
        this.fieldCones = fieldCones;
        this.frontEndComms = frontEndComms;
        this.ultraSonicService = ultraSonicService;
        this.http = http;
        this.localTiltService = localTiltService;
        this.audioService = audioService;
        this.sessionState = new rxjs_1.Subject();
        this.trainingSessionState = new training_session_state_1.TrainingSessionState();
        this.segmentCollectionIndex = 0;
        this.sessionResults = undefined;
        this.fieldCones.onTilt.subscribe(cone => {
            console.log(`Tilt occured from cone with info: ${JSON.stringify(cone)}`);
            this.handleConeHit(cone.id);
        });
        this.localTiltService.TiltOccured.subscribe(cone => {
            this.handleConeHit(0);
        });
        this.sessionState.subscribe((sessionState) => {
            this.frontEndComms.frontEndSocket.emit("sessionStateChanged", sessionState);
        });
        this.ultraSonicService.UltrasonicEvent.subscribe(event => {
            this.handleConeHit(0);
        });
    }
    handleConeHit(id) {
        if (!this.trainingSessionState.getCurrentSession()) {
            return;
        }
        console.log(`Handling cone hit for id ${id}`);
        const athletes = this.trainingSessionState.getCurrentSession().athleteSessions.filter(session => {
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
        if (segmentIdx !== 0) {
            const prevSegment = athletes[0].segments[segmentIdx - 1];
            if (!prevSegment.completed) {
                console.log("Previous segment was not completed, assuming this was an accidental trigger!");
                return;
            }
        }
        else {
            console.log("WARN: segmentIdx is 0! This is probably not expected!");
        }
        this.disableFieldConeTilts(id);
        segment.completed = true;
        console.log("Setting end time..");
        segment.endTime = new Date();
        segment.duration = segment.endTime.getTime() - segment.startTime.getTime();
        if (segment.to === 0) {
            console.log('Playing beep on the start-cone');
            this.audioService.PlayAction("beep");
        }
        if (id !== 0) {
            let segment = athletes[0].segments.find(s => s.from === id);
            segment.startTime = new Date();
            this.enableFieldConeTilts(segment.to);
        }
        this.sessionState.next(this.trainingSessionState);
        if (this.sessionComplete()) {
            if (this.allSessionsComplete()) {
                this.frontEndComms.frontEndSocket.emit("sessionComplete", this.trainingSessionState);
                return;
            }
            this.trainingSessionState.sessionNum = this.trainingSessionState.sessionNum + 1;
            this.sessionState.next(this.trainingSessionState);
            this.setConeActions(this._sessionSetupData);
        }
    }
    sessionComplete() {
        return this.trainingSessionState.getCurrentSession().athleteSessions.every(session => {
            return session.segments.every(segment => segment.completed);
        });
    }
    allSessionsComplete() {
        if (this.trainingSessionState.sessionNum + 1 === this.trainingSessionState.athleteSessions.sessions.length) {
            return true;
        }
        return false;
    }
    async startSession(sessionSetupData) {
        this.buildSessions(sessionSetupData);
        this.setConeActions(sessionSetupData);
        this._sessionSetupData = sessionSetupData;
        this.sessionState.next(this.trainingSessionState);
    }
    async setConeActions(sessionSetupData) {
        const cones = this.fieldCones.connectedFieldCones.getValue();
        const promises = cones.map(cone => {
            const action = sessionSetupData.course.segmentCollection[this.segmentCollectionIndex].segments.find(s => s.from === cone.id).action;
            const url = `http://${cone.ip}:6200/audio/audio-file`;
            return this.http.post(url, { action: action }).toPromise();
        });
        try {
            await Promise.all(promises);
        }
        catch (err) {
            console.log(`Failed to update audio actions. Error: ${err}`);
        }
    }
    buildSessions(sessionSetupData) {
        this.trainingSessionState = new training_session_state_1.TrainingSessionState();
        let i = 0;
        console.log(sessionSetupData);
        sessionSetupData.course.segmentCollection.forEach(segmentCollection => {
            this.trainingSessionState.athleteSessions.sessions.push(new athlete_session_1.AthleteSessionCollection());
            sessionSetupData.athletes.forEach(athlete => {
                const session = new athlete_session_1.AthleteSession(athlete, [], false);
                segmentCollection.segments.forEach(segment => {
                    session.segments.push({
                        from: segment.from,
                        to: segment.to,
                        action: segment.action,
                        completed: false,
                    });
                });
                this.trainingSessionState.athleteSessions.sessions[i].athleteSessions.push(session);
            });
            i++;
        });
        console.log("After build sessions: ", this.trainingSessionState);
    }
    async nextAthleteStarting() {
        return this.markNextAthleteStarted();
    }
    async saveResults() {
        let num = 0;
        this.trainingSessionState.athleteSessions.sessions.forEach(session => {
            this.saveSession(num);
            num++;
        });
    }
    async saveSession(sessionNum) {
        console.log("Saving session results");
        let athleteSessions = this.trainingSessionState.athleteSessions.sessions[sessionNum];
        const session = new SessionSchema_1.SessionSchema();
        session.startTime = new Date();
        session.fieldInfo = "Some Field Info here!";
        session.courseInfo = "Some Course Info Here!";
        const newSession = await session.save();
        athleteSessions.athleteSessions.forEach(async (athleteSession) => {
            const sessionResult = new SessionResultSchema_1.SessionResultSchema();
            sessionResult.athleteId = athleteSession.athlete.id;
            sessionResult.sessionId = newSession.id;
            const newSessionResult = await sessionResult.save();
            try {
                athleteSession.segments.forEach(async (segment) => {
                    const segmentResult = new SegmentResultSchema_1.SegmentResultSchema();
                    segmentResult.duration = segment.duration;
                    segmentResult.action = segment.action;
                    segmentResult.sessionResultId = newSessionResult.id;
                    await segmentResult.save();
                    console.log("Added a segment...");
                });
            }
            catch (err) {
                console.log(`Could not find correct athlete in database with id: ${athleteSession.athlete.id}! Giving up!!`);
                throw err;
            }
        });
        try {
        }
        catch (err) {
            console.log(`Error saving overall session results. Err: ${err}`);
            throw err;
        }
        return true;
    }
    markNextAthleteStarted() {
        if (this.numAthletesRemainingToStart() <= 0) {
            console.log("Frontend wanted to send another athlete, but there are none left!!");
            return false;
        }
        const athleteSession = this.trainingSessionState.getCurrentSession().athleteSessions.find(a => a.started !== true);
        athleteSession.started = true;
        athleteSession.segments[0].startTime = new Date();
        this.audioService.PlayAction(athleteSession.segments[0].action);
        this.enableFieldConeTilts(athleteSession.segments[0].to);
        console.log(`Athlete ${athleteSession.athlete.firstName} ${athleteSession.athlete.lastName} has started the course at ${athleteSession.segments[0].startTime}. There are ${this.numAthletesRemainingToStart()} athletes remaining!`);
        this.sessionState.next(this.trainingSessionState);
        return true;
    }
    enableFieldConeTilts(id) {
        if (id === 0) {
            console.log(`Enabling tilts for ourself because the ID is 0`);
            this.localTiltService.setTiltsEnabled(true);
            return;
        }
        const fieldCone = this.fieldCones.getFieldConeSocketClient(id);
        if (!fieldCone) {
            console.log(`WARNING (FATAL): Could not get the socket.io client for id: ${id}. This is probably horrible.`);
            return;
        }
        fieldCone.client.emit("EnableTilts");
    }
    disableFieldConeTilts(id) {
        if (id === 0) {
            console.log(`Disabling tilts for ourself because the ID is 0`);
            this.localTiltService.setTiltsEnabled(false);
            return;
        }
        const fieldCone = this.fieldCones.getFieldConeSocketClient(id);
        if (!fieldCone) {
            console.log(`WARNING (FATAL): Could not get the socket.io client for id: ${id}. This is probably horrible.`);
            return;
        }
        fieldCone.client.emit("DisableTilts");
    }
    numAthletesRemainingToStart() {
        return this.trainingSessionState.getCurrentSession().athleteSessions.filter(s => !s.started).length;
    }
};
TrainingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [field_cones_service_1.FieldConesService,
        front_end_communicator_service_1.FrontEndCommunicator,
        base_ultrasonic_service_1.BaseUltrasonicService,
        common_1.HttpService,
        base_tilt_service_1.BaseTiltService,
        base_audio_service_1.BaseAudioService])
], TrainingService);
exports.TrainingService = TrainingService;
//# sourceMappingURL=training.service.js.map