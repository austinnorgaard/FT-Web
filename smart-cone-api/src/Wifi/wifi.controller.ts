import { Controller, Get, Post, Body } from "@nestjs/common";
import { WifiSettingsService } from "./wifi.service";

export class AddWiFiSettingDTO {
    ssid: string;
    password: string;
}

@Controller("wifi")
export class WifiController {
    constructor(private readonly wifiSettings: WifiSettingsService) {}

    @Post("settings")
    async addWifiSetting(@Body() body: AddWiFiSettingDTO) {
        console.log(`Adding wifi setting: ${body.ssid} - ${body.password}`);

        this.wifiSettings.addWifiSetting(body.ssid, body.password);
    }
}
