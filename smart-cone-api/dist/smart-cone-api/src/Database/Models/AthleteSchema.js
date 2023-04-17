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
const sequelize_typescript_1 = require("sequelize-typescript");
const AthleteTeamSchema_1 = require("./AthleteTeamSchema");
const TeamSchema_1 = require("./TeamSchema");
const SessionResultSchema_1 = require("./SessionResultSchema");
let AthleteSchema = class AthleteSchema extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({ autoIncrement: true }),
    __metadata("design:type", Number)
], AthleteSchema.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "firstName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "lastName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "phoneNumber", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "gender", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AthleteSchema.prototype, "weight", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AthleteSchema.prototype, "height", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "parent1Name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "parent1Email", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "parent1Phone", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "parent2Name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "parent2Email", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AthleteSchema.prototype, "parent2Phone", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => TeamSchema_1.TeamSchema, () => AthleteTeamSchema_1.AthleteTeamSchema),
    __metadata("design:type", Array)
], AthleteSchema.prototype, "teams", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => SessionResultSchema_1.SessionResultSchema),
    __metadata("design:type", Array)
], AthleteSchema.prototype, "sessionResults", void 0);
AthleteSchema = __decorate([
    sequelize_typescript_1.Table({
        modelName: "Athletes",
    })
], AthleteSchema);
exports.AthleteSchema = AthleteSchema;
//# sourceMappingURL=AthleteSchema.js.map