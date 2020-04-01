import { Controller, Get, Post, Body } from "@nestjs/common";
import { BaseWifiService } from "./base-wifi.service";

export class AddWiFiSettingDTO {
    ssid: string;
    password: string;
}

@Controller("wifi")
export class WifiController {
    constructor(private readonly wifiSettings: BaseWifiService) {}

    @Post("settings")
    async addWifiSetting(@Body() body: AddWiFiSettingDTO) {
        console.log(`Adding wifi setting: ${body.ssid} - ${body.password}`);

        this.wifiSettings.addWifiSetting(body.ssid, body.password);
    }
}
