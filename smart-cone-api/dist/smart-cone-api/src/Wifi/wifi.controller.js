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
const base_wifi_service_1 = require("./base-wifi.service");
class AddWiFiSettingDTO {
}
exports.AddWiFiSettingDTO = AddWiFiSettingDTO;
let WifiController = class WifiController {
    constructor(wifiSettings) {
        this.wifiSettings = wifiSettings;
    }
    async addWifiSetting(body) {
        console.log(`Adding wifi setting: ${body.ssid} - ${body.password}`);
        this.wifiSettings.addWifiSetting(body.ssid, body.password);
    }
};
__decorate([
    common_1.Post("settings"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddWiFiSettingDTO]),
    __metadata("design:returntype", Promise)
], WifiController.prototype, "addWifiSetting", null);
WifiController = __decorate([
    common_1.Controller("wifi"),
    __metadata("design:paramtypes", [base_wifi_service_1.BaseWifiService])
], WifiController);
exports.WifiController = WifiController;
//# sourceMappingURL=wifi.controller.js.map