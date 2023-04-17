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
const athlete_1 = require("./athlete");
const team_1 = require("../Teams/team");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
function a() {
    return athlete_1.Athlete;
}
function t() {
    return team_1.Team;
}
class AthleteRegistration {
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(a),
    class_validator_1.IsDefined(),
    __metadata("design:type", athlete_1.Athlete)
], AthleteRegistration.prototype, "athlete", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(t),
    class_validator_1.IsOptional(),
    __metadata("design:type", team_1.Team)
], AthleteRegistration.prototype, "team", void 0);
exports.AthleteRegistration = AthleteRegistration;
//# sourceMappingURL=athlete-registration.js.map