"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const wifi_controller_1 = require("./wifi.controller");
const wifi_service_1 = require("./wifi.service");
const fs = require("fs");
const base_wifi_service_1 = require("./base-wifi.service");
const mock_wifi_service_1 = require("./mock-wifi.service");
function isReal() {
    try {
        fs.readFileSync("/etc/wpa_supplicant/wpa_supplicant.conf");
        return true;
    }
    catch (err) {
        return false;
    }
}
let WifiModule = class WifiModule {
};
WifiModule = __decorate([
    common_1.Module({
        providers: [{
                provide: base_wifi_service_1.BaseWifiService,
                useClass: isReal() ? wifi_service_1.WifiSettingsService : mock_wifi_service_1.MockWifiService
            }],
        controllers: [wifi_controller_1.WifiController],
        imports: [],
        exports: [base_wifi_service_1.BaseWifiService],
    })
], WifiModule);
exports.WifiModule = WifiModule;
//# sourceMappingURL=wifi.module.js.map