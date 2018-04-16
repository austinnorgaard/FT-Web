import { Component, Inject } from "@nestjs/common";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { Team } from "./Team";
import { DatabaseError } from "../Utility/database-error";
import { AthleteSchema } from "../Database/Models/AthleteSchema";

@Component()
export class TeamsService {
    async addTeam(team: Team): Promise<DatabaseResponse> {
        const t = new TeamSchema(team);
        return await this.addTeamToDb(t);
    }

    async getTeams(): Promise<Team[]> {
        return TeamSchema.all({
            include: [AthleteSchema]
        });
    }

    async addTeamToDb(team: TeamSchema): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            team
                .save()
                .then(() => {
                    let response = new DatabaseResponse(true, "Team added!");
                    resolve(response);
                })
                .catch(err => {
                    reject(DatabaseError.GetResponse(err));
                });
        });
    }
}
