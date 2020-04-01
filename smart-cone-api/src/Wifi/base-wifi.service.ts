import { WifiSetting } from "./wifi.service";
import { Observable } from "rxjs";

// Interface for the WifiService
export abstract class BaseWifiService {
    abstract serializeWifiSettings(): void;
    abstract deserializeWifiSettings(contents: string): Array<WifiSetting>;
    abstract addWifiSetting(ssid: string, password: string): void;
    abstract getWifiSettingsObservable(): Observable<Array<WifiSetting>>;
    abstract getWifiSettings(): Array<WifiSetting>;
}