import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { BehaviorSubject, Observable } from "rxjs";

export class WifiSetting {
    ssid: string;
    password: string;
}

@Injectable()
export class WifiSettingsService {
    private wifiSettings: BehaviorSubject<Array<WifiSetting>> = new BehaviorSubject<Array<WifiSetting>>([]);

    constructor() {
        // Read the current list of wifi settings off disk
        const contents = fs.readFileSync("/etc/wpa_supplicant/wpa_supplicant.conf").toString();

        console.log(`Contents of wifi settings: ${contents}`);

        this.wifiSettings.next(this.deserializeWifiSettings(contents));

        console.log(`Wifi Settings deserialized`, this.wifiSettings);
    }

    serializeWifiSettings(): void {
        // Write our in-memory wifi-settings to disk, in the wpa_supplicant.conf format

        // some bits are hard-coded
        let contents = "";
        contents += "ctrl_interface=DIR=/var/run/wpa_supplicant\n";
        contents += "country=US\n";

        // For each wifi setting, emit the network block
        this.wifiSettings.getValue().forEach(setting => {
            contents += "network={\n";
            contents += `\tssid="${setting.ssid}"\n`;
            contents += `\tpsk="${setting.password}"\n`;
            contents += "}\n";
        });

        fs.writeFileSync("/etc/wpa_supplicant/wpa_supplicant.conf", contents);
    }

    deserializeWifiSettings(contents: string): Array<WifiSetting> {
        // Read the on-disk wpa_supplicant.conf wifi settings in memory
        let settings: Array<WifiSetting> = [];

        // this is BRITTLE but we control both the initial wpa_supplicant format, along with the
        // serializer, so we'll sort of hard-code it

        // The file has some lines of uninteresting info at the top, each relevant Wifi setting looks like:
        // network={
        //      ssid="<SOME_SSID>"
        //      psk="SOME_PASSWORD"
        // }

        // And repeats for every wifi setting. so we can iterate every line and just discard things until it starts with
        // "network={" (with white-space stripped), then just grab off the next two lines, split on '=', and strip off
        // the quotes around both the SSID and PSK
        const items = contents.split("\n");

        items.forEach((line, index) => {
            if (
                line
                    .trim()
                    .replace(/ /g, "")
                    .startsWith("network={")
            ) {
                console.log("Found a network line!");
                const ssidStr = items[index + 1].trim();
                const passwordStr = items[index + 2].trim();

                // ssid str looks like: ssid=<ssid>
                // password str looks like psk=<password>
                const ssid = ssidStr.substring(5).replace(/\"/g, "");
                const password = passwordStr.substring(4).replace(/\"/g, "");

                settings.push({
                    ssid: ssid,
                    password: password,
                });
            } else {
                return;
            }
        });

        return settings;
    }

    addWifiSetting(ssid: string, password: string) {
        // Update our internal master list of wifi settings
        const values = this.wifiSettings.getValue();

        // if the ssid already exists, update the existing one
        const existingSetting = values.find(setting => {
            return setting.ssid === ssid;
        });

        if (existingSetting) {
            existingSetting.password = password;
        } else {
            values.push({
                ssid: ssid,
                password: password,
            } as WifiSetting);
        }

        this.wifiSettings.next(values);
        this.serializeWifiSettings();
    }

    getWifiSettingsObservable(): Observable<Array<WifiSetting>> {
        return this.wifiSettings.asObservable();
    }

    getWifiSettings(): Array<WifiSetting> {
        return this.wifiSettings.getValue();
    }
}
