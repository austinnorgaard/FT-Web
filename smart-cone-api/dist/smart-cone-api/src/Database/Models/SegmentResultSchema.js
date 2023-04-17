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
const SessionResultSchema_1 = require("./SessionResultSchema");
let SegmentResultSchema = class SegmentResultSchema extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({ autoIncrement: true }),
    __metadata("design:type", Number)
], SegmentResultSchema.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], SegmentResultSchema.prototype, "duration", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SegmentResultSchema.prototype, "action", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => SessionResultSchema_1.SessionResultSchema),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SegmentResultSchema.prototype, "sessionResultId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => SessionResultSchema_1.SessionResultSchema),
    __metadata("design:type", SessionResultSchema_1.SessionResultSchema)
], SegmentResultSchema.prototype, "sessionResult", void 0);
SegmentResultSchema = __decorate([
    sequelize_typescript_1.Table({
        modelName: "SegmentResult",
    })
], SegmentResultSchema);
exports.SegmentResultSchema = SegmentResultSchema;
//# sourceMappingURL=SegmentResultSchema.js.map