import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Team } from "../../../../../smart-cone-api/src/Teams/team";

import * as config from "../../../global-config";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { DatabaseResponse } from "../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TeamManagementService {
    constructor(private http: HttpClient) {}

    createTeam(team: Team): Promise<DatabaseResponse> {
        return this.http
            .post<DatabaseResponse>(config.toSmartConeHttp("/teams"), team)
            .toPromise()
            .catch(err => Promise.reject(err.error as DatabaseResponse));
    }
}
