import { Component, Inject } from "@nestjs/common";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { AddTeamData } from "../../../field-trainer/field-trainer/src/app/models/add-team-data";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { Team } from "./Team";

@Component()
export class TeamsService {
    async addTeam(team: Team): Promise<DatabaseResponse> {
        const t = new TeamSchema(team);
        return await this.addTeamToDb(t);
    }

    async addTeamToDb(team: TeamSchema): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            team
                .save()
                .then(() => {
                    let response = new DatabaseResponse(true, "Team added!");
                    resolve(response);
                })
                .catch(UniqueConstraitError => {
                    let response = new DatabaseResponse(
                        false,
                        "Unique constraint violated!",
                        DatabaseFailureType.UniqueConstraintViolated,
                        UniqueConstraitError.fields
                    );
                    reject(response);
                })
                .catch(err => {
                    let response = new DatabaseResponse(
                        false,
                        "Unhandled error! Details in data field",
                        DatabaseFailureType.UnknownError,
                        err
                    );
                    reject(response);
                });
        });
    }
}
