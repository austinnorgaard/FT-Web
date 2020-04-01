import { Module } from "@nestjs/common";
import { WifiController } from "./wifi.controller";
import { WifiSettingsService } from "./wifi.service";

import * as fs from "fs";
import { BaseWifiService } from "./base-wifi.service";
import { MockWifiService } from "./mock-wifi.service";

function isReal(): boolean {
    try {
        // If the /etc/wpa_supplicant/wpa_supplicant.conf file exists
        // we're either on a real system, or at least on a similar-enough
        // system that we can do get the wifi module working
        fs.readFileSync("/etc/wpa_supplicant/wpa_supplicant.conf");
        return true;
    } catch (err) {
        // must be on a dev machine
        return false;
    }
}

@Module({
    providers: [{
        provide: BaseWifiService,
        useClass: isReal() ? WifiSettingsService : MockWifiService
    }],
    controllers: [WifiController],
    imports: [],
    exports: [BaseWifiService],
})
export class WifiModule {}
