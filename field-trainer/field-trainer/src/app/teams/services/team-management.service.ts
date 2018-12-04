import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Team } from "../../../../../../smart-cone-api/src/Teams/team";
import { DatabaseResponse } from "../../../../../../smart-cone-api/src/Database/Data/DatabaseResponse";
import { AddAthleteTeamModel } from "../../../../../../smart-cone-api/src/Teams/add-athlete-team-model";

import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { HttpHelperService } from "../../misc/services/http-helper.service";

@Injectable()
export class TeamManagementService {
    constructor(private http: HttpHelperService) {}

    async createTeam(team: Team): Promise<DatabaseResponse> {
        try {
            const result = await this.http.post<DatabaseResponse>("/teams", team);
            return result;
        } catch (err) {
            console.log(`Failed to create team: ${team.teamName}. Error: ${JSON.stringify(err)}`);
            throw err as DatabaseResponse;
        }
    }

    async getTeams(): Promise<Team[]> {
        try {
            const result = await this.http.get<Team[]>("/teams");
            return result;
        } catch (err) {
            console.log(`Failed to get teams. Error: ${JSON.stringify(err)}`);
            throw err;
        }
    }

    async getTeamById(id: number): Promise<Team> {
        const params = new HttpParams().set("id", id.toString());
        try {
            const result = await this.http.get<Team>(`/teams/${id}`);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async addAthleteToTeam(teamId: number, athleteId: number) {
        try {
            const result = await this.http.post<DatabaseResponse>(`/teams/${teamId}/athletes`, { athleteId });
            return result;
        } catch (err) {
            throw err;
        }
    }

    async removeAthleteFromTeam(teamId: number, athleteId: number) {
        try {
            const result = await this.http.delete(`/teams/${teamId}/athletes/${athleteId}`);
            return result;
        } catch (err) {
            throw err;
        }
    }
}