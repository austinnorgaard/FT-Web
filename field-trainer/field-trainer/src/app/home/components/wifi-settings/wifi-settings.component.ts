import { Component, OnInit } from "@angular/core";
import { WiFiSettingsService } from "../../services/wifi-settings.service";

@Component({
    selector: "ft-wifi-settings",
    templateUrl: "./wifi-settings.component.html",
    styleUrls: ["./wifi-settings.component.css"],
})
export class WifiSettingsComponent implements OnInit {
    newSsid: string;
    newPassword: string;

    constructor(private readonly wifiSettingsService: WiFiSettingsService) {}

    ngOnInit() {}

    submitNewWifiValid(): boolean {
        return true;
    }

    async addNewWiFi(): Promise<void> {
        console.log(`Adding new WiFi with: ${this.newSsid} / ${this.newPassword}`);
        await this.wifiSettingsService.addWiFiSettings(this.newSsid, this.newPassword);
    }
}
