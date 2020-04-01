import { Injectable } from "@nestjs/common";
import { BaseWifiService } from "./base-wifi.service";
import { WifiSetting } from "./wifi.service";

@Injectable()
export class MockWifiService extends BaseWifiService {
    constructor() {
        super();
        console.log("Using fake wifi service");
    }
    serializeWifiSettings(): void {
    }
    deserializeWifiSettings(contents: string): WifiSetting[] {
        return [];
    }
    addWifiSetting(ssid: string, password: string): void {
    }
    initializeWifiSettings(wifiSettings: WifiSetting[]): void {
    }

}