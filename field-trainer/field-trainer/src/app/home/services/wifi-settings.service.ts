import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../misc/services/http-helper.service";

@Injectable()
export class WiFiSettingsService {
    constructor(private readonly http: HttpHelperService) {}

    async addWiFiSettings(ssid: string, password: string): Promise<void> {
        return await this.http.post<void>("/wifi/settings", {
            ssid: ssid,
            password: password,
        });
    }
}
