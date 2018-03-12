import { Component, Inject } from "@nestjs/common";
import { Team } from "../Database/Models/Team";
import { AddTeamData } from "../../../field-trainer/field-trainer/src/app/models/add-team-data";

@Component()
export class TeamsService {
    constructor(@Inject("TeamsRepository") private readonly teamsRepository: typeof Team) {}

    addTeam(team: AddTeamData): Promise<Team> {
        const t = new Team({
            teamName: team.teamName,
            ageGroup: team.ageGroup,
            teamGender: team.teamGender
        });

        return Promise.resolve(t.save());
    }
}
