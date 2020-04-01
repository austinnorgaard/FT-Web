import { Injectable } from "@nestjs/common";
import { BaseWifiService } from "./base-wifi.service";
import { WifiSetting } from "./wifi.service";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class MockWifiService extends BaseWifiService {
    private fakeSettings: BehaviorSubject<Array<WifiSetting>> = new BehaviorSubject<Array<WifiSetting>>([]);
    getWifiSettingsObservable(): Observable<WifiSetting[]> {
        return this.fakeSettings.asObservable();
    }
    getWifiSettings(): WifiSetting[] {
        return [];
    }
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