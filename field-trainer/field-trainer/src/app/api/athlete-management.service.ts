import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AthleteRegistration } from "../../../../../smart-cone-api/src/Athletes/athlete-registration";
import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { FT_CONFIG } from "../../../global-config";

@Injectable()
export class AthleteManagementService {
    constructor(private http: HttpClient) {}

    createAthlete(athleteRegistration: AthleteRegistration): Promise<DatabaseResponse> {
        return this.http
            .post<DatabaseResponse>(FT_CONFIG.toSmartConeHttp("/athletes"), athleteRegistration)
            .toPromise()
            .catch(err => Promise.reject(err as DatabaseResponse));
    }
}
