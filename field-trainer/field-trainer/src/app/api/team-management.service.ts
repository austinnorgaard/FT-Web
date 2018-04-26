import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Team } from "../../../../../smart-cone-api/src/Teams/team";
import { FT_CONFIG } from "../../../global-config";
import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { Athlete } from "../../../../../smart-cone-api/src/Athletes/athlete";

@Injectable()
export class TeamManagementService {
    constructor(private http: HttpClient) {}

    createTeam(team: Team): Promise<DatabaseResponse> {
        return this.http
            .post<DatabaseResponse>(FT_CONFIG.toSmartConeHttp("/teams"), team)
            .toPromise()
            .catch(err => Promise.reject(err as DatabaseResponse));
    }

    getTeams(): Promise<Team[]> {
        return this.http
            .get<Team[]>(FT_CONFIG.toSmartConeHttp("/teams"))
            .toPromise()
            .catch(err => Promise.reject(err));
    }

    addAthleteToTeam(athlete: Athlete) {}

    removeAthleteFromTeam(athlete: Athlete) {}
}
