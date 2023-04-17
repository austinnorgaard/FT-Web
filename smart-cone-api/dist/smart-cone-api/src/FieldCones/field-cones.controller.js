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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const field_cones_service_1 = require("./field-cones.service");
const field_cone_info_1 = require("./field-cone-info");
let FieldConesController = class FieldConesController {
    constructor(fieldConesService, http) {
        this.fieldConesService = fieldConesService;
        this.http = http;
    }
    getCones() {
        return { items: this.fieldConesService.connectedFieldCones.getValue() };
    }
    async putCone(body) {
        console.log(`Sending to: http://${body.ip}:6200/comms/id`);
        await this.http.post(`http://${body.ip}:6200/comms/id`, { id: body.id }).toPromise();
    }
    async makeNoise(body) {
        console.log(`Telling cone at ${body.ip} to make a noise!`);
        await this.http.post(`http://${body.ip}:6200/audio/test-noise`, {}).toPromise();
    }
    async updateCone(body) {
        try {
            const cone = this.fieldConesService.connectedFieldCones.getValue().find(c => {
                return c.id === body.id;
            });
            if (cone) {
                console.log(`Attempting to update cone with ID ${body.id}`);
                await this.http.post(`http://${cone.ip}:6200/comms/update`).toPromise();
            }
        }
        catch (err) {
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", field_cone_info_1.FieldConeInfoArray)
], FieldConesController.prototype, "getCones", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [field_cone_info_1.FieldConeInfo]),
    __metadata("design:returntype", Promise)
], FieldConesController.prototype, "putCone", null);
__decorate([
    common_1.Post("noise"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [field_cone_info_1.FieldConeInfo]),
    __metadata("design:returntype", Promise)
], FieldConesController.prototype, "makeNoise", null);
__decorate([
    common_1.Post("update"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [field_cone_info_1.FieldConeInfo]),
    __metadata("design:returntype", Promise)
], FieldConesController.prototype, "updateCone", null);
FieldConesController = __decorate([
    common_1.Controller("field-cones"),
    __metadata("design:paramtypes", [field_cones_service_1.FieldConesService, common_1.HttpService])
], FieldConesController);
exports.FieldConesController = FieldConesController;
//# sourceMappingURL=field-cones.controller.js.map