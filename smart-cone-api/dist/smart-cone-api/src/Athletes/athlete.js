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
const class_validator_1 = require("class-validator");
const team_1 = require("../Teams/team");
const class_transformer_1 = require("class-transformer");
function t() {
    return team_1.Team;
}
class Athlete {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Athlete.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Athlete.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Athlete.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsOptional(), class_validator_1.IsString(),
    __metadata("design:type", String)
], Athlete.prototype, "email", void 0);
__decorate([
    class_validator_1.IsPhoneNumber("US"),
    __metadata("design:type", String)
], Athlete.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Athlete.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Athlete.prototype, "weight", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Athlete.prototype, "height", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Athlete.prototype, "parent1Name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Athlete.prototype, "parent1Email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Athlete.prototype, "parent1Phone", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Athlete.prototype, "parent2Name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Athlete.prototype, "parent2Email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Athlete.prototype, "parent2Phone", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(t),
    __metadata("design:type", Array)
], Athlete.prototype, "teams", void 0);
exports.Athlete = Athlete;
class BlahDto {
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], BlahDto.prototype, "id", void 0);
exports.BlahDto = BlahDto;
//# sourceMappingURL=athlete.js.map