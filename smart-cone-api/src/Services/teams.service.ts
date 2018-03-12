import { Component, Inject } from "@nestjs/common";
import { Team } from "../Database/Models/Team";
import { AddTeamData } from "../../../field-trainer/field-trainer/src/app/models/add-team-data";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";

@Component()
export class TeamsService {
    constructor(@Inject("TeamsRepository") private readonly teamsRepository: typeof Team) {}

    async addTeam(team: AddTeamData): Promise<DatabaseResponse> {
        const t = new Team({
            teamName: team.teamName,
            ageGroup: team.ageGroup,
            teamGender: team.teamGender
        });

        return await this.addTeamToDb(t);
    }

    async addTeamToDb(team: Team): Promise<DatabaseResponse> {
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
