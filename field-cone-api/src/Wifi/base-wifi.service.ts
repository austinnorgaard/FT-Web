import { WifiSetting } from "./wifi.service";

// Interface for the WifiService
export abstract class BaseWifiService {
    abstract serializeWifiSettings(): void;
    abstract deserializeWifiSettings(contents: string): Array<WifiSetting>;
    abstract addWifiSetting(ssid: string, password: string): void;
    abstract initializeWifiSettings(wifiSettings: Array<WifiSetting>): void;
}