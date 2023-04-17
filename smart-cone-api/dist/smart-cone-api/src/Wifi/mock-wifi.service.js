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
const base_wifi_service_1 = require("./base-wifi.service");
const rxjs_1 = require("rxjs");
let MockWifiService = class MockWifiService extends base_wifi_service_1.BaseWifiService {
    constructor() {
        super();
        this.fakeSettings = new rxjs_1.BehaviorSubject([]);
        console.log("Using fake wifi service");
    }
    getWifiSettingsObservable() {
        return this.fakeSettings.asObservable();
    }
    getWifiSettings() {
        return [];
    }
    serializeWifiSettings() {
    }
    deserializeWifiSettings(contents) {
        return [];
    }
    addWifiSetting(ssid, password) {
    }
    initializeWifiSettings(wifiSettings) {
    }
};
MockWifiService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MockWifiService);
exports.MockWifiService = MockWifiService;
//# sourceMappingURL=mock-wifi.service.js.map