import { Controller, Post, Body } from "@nestjs/common";
import { AddTeamData } from "../../../field-trainer/field-trainer/src/app/models/add-team-data";
import { TeamsService } from "../Services/teams.service";

@Controller("teams")
export class TeamsController {
    constructor(private teamsService: TeamsService) {}

    @Post()
    create(@Body() teamData: AddTeamData) {
        console.log(teamData);
        console.log("POST for Teams Controller hit!");

        this.teamsService
            .addTeam(teamData)
            .then(() => {
                console.log("Team added!!");
            })
            .catch(() => {
                console.log("Failed to add team!");
            });
    }
}
