import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Team } from "../../../../../../smart-cone-api/src/Teams/team";
import { FT_CONFIG } from "../../../../global-config";
import { DatabaseResponse } from "../../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { AddAthleteTeamModel } from "../../../../../../smart-cone-api/src/Teams/add-athlete-team-model";
import { Observable } from "rxjs";

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";

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

    getTeamById(id: number): Promise<Team> {
        const params = new HttpParams().set("id", id.toString());
        return this.http
            .get<Team>(FT_CONFIG.toSmartConeHttp("/teams/by-id"), { params: params })
            .toPromise()
            .catch(err => Promise.reject(err));
    }

    addAthleteToTeam(data: AddAthleteTeamModel) {
        return this.http
            .post<DatabaseResponse>(FT_CONFIG.toSmartConeHttp("/teams/add-athlete"), data)
            .toPromise()
            .catch(err => Promise.reject(err as DatabaseResponse));
    }

    removeAthleteFromTeam(data: AddAthleteTeamModel) {
        return this.http
            .post<DatabaseResponse>(FT_CONFIG.toSmartConeHttp("/teams/remove-athlete"), data)
            .toPromise()
            .catch(err => Promise.reject(err as DatabaseResponse));
    }
}
