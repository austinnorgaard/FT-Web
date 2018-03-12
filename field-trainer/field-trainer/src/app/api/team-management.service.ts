import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AddTeamData } from "../models/add-team-data";

import * as config from "../../../global-config";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TeamManagementService {
    constructor(private http: HttpClient) {}

    createTeam(team: AddTeamData): Promise<DatabaseResponse> {
        return this.http
            .post<DatabaseResponse>(config.toSmartConeHttp("/teams"), team)
            .toPromise()
            .catch(err => Promise.reject(err.error as DatabaseResponse));
    }
}
