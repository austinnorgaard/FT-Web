import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AthleteRegistration } from "../../../../../../smart-cone-api/src/Athletes/athlete-registration";
import { DatabaseResponse } from "../../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { environment } from "../../../environments/environment";
@Injectable()
export class AthleteManagementService {
    constructor(private http: HttpClient) {}

    createAthlete(athleteRegistration: AthleteRegistration): Promise<DatabaseResponse> {
        return this.http
            .post<DatabaseResponse>(environment.config.toSmartConeHttp("/athletes"), athleteRegistration)
            .toPromise()
            .catch(err => Promise.reject(err as DatabaseResponse));
    }

    getAthletes(): Promise<Athlete[]> {
        return this.http
            .get<Athlete[]>(environment.config.toSmartConeHttp("/athletes"))
            .toPromise()
            .catch(err => Promise.reject(err));
    }

    removeAthlete(id: number): Promise<DatabaseResponse> {
        const params = new HttpParams().set("id", id.toString());
        return this.http
            .delete<DatabaseResponse>(environment.config.toSmartConeHttp("/athletes/by-id"), { params: params })
            .toPromise()
            .catch(err => Promise.reject(err));
    }
}
