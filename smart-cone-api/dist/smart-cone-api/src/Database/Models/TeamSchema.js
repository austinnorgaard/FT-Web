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
const AthleteSchema_1 = require("./AthleteSchema");
const AthleteTeamSchema_1 = require("./AthleteTeamSchema");
let TeamSchema = class TeamSchema extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({ autoIncrement: true }),
    __metadata("design:type", Number)
], TeamSchema.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({
        unique: "uniqueTeam",
    }),
    __metadata("design:type", String)
], TeamSchema.prototype, "teamName", void 0);
__decorate([
    sequelize_typescript_1.Column({
        unique: "uniqueTeam",
    }),
    __metadata("design:type", String)
], TeamSchema.prototype, "ageGroup", void 0);
__decorate([
    sequelize_typescript_1.Column({ unique: "uniqueTeam" }),
    __metadata("design:type", String)
], TeamSchema.prototype, "teamGender", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => AthleteSchema_1.AthleteSchema, () => AthleteTeamSchema_1.AthleteTeamSchema),
    __metadata("design:type", Array)
], TeamSchema.prototype, "teamAthletes", void 0);
TeamSchema = __decorate([
    sequelize_typescript_1.Table({
        modelName: "Teams",
    })
], TeamSchema);
exports.TeamSchema = TeamSchema;
//# sourceMappingURL=TeamSchema.js.map