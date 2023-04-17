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
const SessionSchema_1 = require("./SessionSchema");
const SegmentResultSchema_1 = require("./SegmentResultSchema");
let SessionResultSchema = class SessionResultSchema extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({ autoIncrement: true }),
    __metadata("design:type", Number)
], SessionResultSchema.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => SessionSchema_1.SessionSchema),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SessionResultSchema.prototype, "sessionId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => SessionSchema_1.SessionSchema),
    __metadata("design:type", SessionSchema_1.SessionSchema)
], SessionResultSchema.prototype, "session", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => AthleteSchema_1.AthleteSchema),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SessionResultSchema.prototype, "athleteId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => AthleteSchema_1.AthleteSchema),
    __metadata("design:type", AthleteSchema_1.AthleteSchema)
], SessionResultSchema.prototype, "athlete", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => SegmentResultSchema_1.SegmentResultSchema),
    __metadata("design:type", Array)
], SessionResultSchema.prototype, "segmentResults", void 0);
SessionResultSchema = __decorate([
    sequelize_typescript_1.Table({
        modelName: "SessionResult",
    })
], SessionResultSchema);
exports.SessionResultSchema = SessionResultSchema;
//# sourceMappingURL=SessionResultSchema.js.map