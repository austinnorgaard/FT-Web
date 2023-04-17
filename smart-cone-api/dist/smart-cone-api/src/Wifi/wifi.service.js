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
const fs = require("fs");
const rxjs_1 = require("rxjs");
const base_wifi_service_1 = require("./base-wifi.service");
class WifiSetting {
}
exports.WifiSetting = WifiSetting;
let WifiSettingsService = class WifiSettingsService extends base_wifi_service_1.BaseWifiService {
    constructor() {
        super();
        this.wifiSettings = new rxjs_1.BehaviorSubject([]);
        const contents = fs.readFileSync("/etc/wpa_supplicant/wpa_supplicant.conf").toString();
        console.log(`Contents of wifi settings: ${contents}`);
        this.wifiSettings.next(this.deserializeWifiSettings(contents));
        console.log(`Wifi Settings deserialized`, this.wifiSettings);
    }
    initializeWifiSettings(wifiSettings) {
    }
    serializeWifiSettings() {
        let contents = "";
        contents += "ctrl_interface=DIR=/var/run/wpa_supplicant\n";
        contents += "country=US\n";
        this.wifiSettings.getValue().forEach(setting => {
            contents += "network={\n";
            contents += `\tssid="${setting.ssid}"\n`;
            contents += `\tpsk="${setting.password}"\n`;
            contents += "}\n";
        });
        fs.writeFileSync("/etc/wpa_supplicant/wpa_supplicant.conf", contents);
    }
    deserializeWifiSettings(contents) {
        let settings = [];
        const items = contents.split("\n");
        items.forEach((line, index) => {
            if (line
                .trim()
                .replace(/ /g, "")
                .startsWith("network={")) {
                console.log("Found a network line!");
                const ssidStr = items[index + 1].trim();
                const passwordStr = items[index + 2].trim();
                const ssid = ssidStr.substring(5).replace(/\"/g, "");
                const password = passwordStr.substring(4).replace(/\"/g, "");
                settings.push({
                    ssid: ssid,
                    password: password,
                });
            }
            else {
                return;
            }
        });
        return settings;
    }
    addWifiSetting(ssid, password) {
        const values = this.wifiSettings.getValue();
        const existingSetting = values.find(setting => {
            return setting.ssid === ssid;
        });
        if (existingSetting) {
            existingSetting.password = password;
        }
        else {
            values.push({
                ssid: ssid,
                password: password,
            });
        }
        this.wifiSettings.next(values);
        this.serializeWifiSettings();
    }
    getWifiSettingsObservable() {
        return this.wifiSettings.asObservable();
    }
    getWifiSettings() {
        return this.wifiSettings.getValue();
    }
};
WifiSettingsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], WifiSettingsService);
exports.WifiSettingsService = WifiSettingsService;
//# sourceMappingURL=wifi.service.js.map