import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AddTeamData } from "../models/add-team-data";

import * as config from "../../../global-config";
import "rxjs/add/operator/toPromise";

@Injectable()
export class TeamManagementService {
    constructor(private http: HttpClient) {}

    createTeam(team: AddTeamData): Promise<Object> {
        return this.http
            .post(config.toSmartConeHttp("/teams"), team)
            .toPromise();
    }
}
