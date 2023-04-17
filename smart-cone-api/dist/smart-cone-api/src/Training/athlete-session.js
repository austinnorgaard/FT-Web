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
const athlete_1 = require("../Athletes/athlete");
const segment_1 = require("./segment");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SegmentArray {
    constructor(segments) {
        if (segments) {
            this.items = segments;
        }
        else {
            this.items = [];
        }
    }
}
__decorate([
    class_transformer_1.Type(() => segment_1.Segment),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Array)
], SegmentArray.prototype, "items", void 0);
exports.SegmentArray = SegmentArray;
class AthleteSessionArray {
    constructor() {
        this.sessions = [];
    }
}
__decorate([
    class_transformer_1.Type(() => AthleteSessionCollection),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Array)
], AthleteSessionArray.prototype, "sessions", void 0);
exports.AthleteSessionArray = AthleteSessionArray;
class AthleteSessionCollection {
    constructor() {
        this.athleteSessions = [];
    }
}
__decorate([
    class_transformer_1.Type(() => AthleteSession),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Array)
], AthleteSessionCollection.prototype, "athleteSessions", void 0);
exports.AthleteSessionCollection = AthleteSessionCollection;
class AthleteSession {
    constructor(athlete, segments, started) {
        this.athlete = athlete;
        this.segments = segments;
        this.started = started;
    }
}
__decorate([
    class_transformer_1.Type(() => athlete_1.Athlete),
    class_validator_1.ValidateNested(),
    __metadata("design:type", athlete_1.Athlete)
], AthleteSession.prototype, "athlete", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_transformer_1.Type(() => segment_1.Segment),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Array)
], AthleteSession.prototype, "segments", void 0);
exports.AthleteSession = AthleteSession;
//# sourceMappingURL=athlete-session.js.map