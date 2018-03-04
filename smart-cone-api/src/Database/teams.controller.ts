import { Controller, Post, Body } from "@nestjs/common";
import { AddTeamData } from "../../../field-trainer/field-trainer/src/app/models/add-team-data";
import { DatabaseComponent } from "./database.component";

@Controller("teams")
export class TeamsController {
    constructor(private database: DatabaseComponent) {}

    @Post()
    create(@Body() teamData: AddTeamData) {
        console.log(teamData);
        console.log("POST for Teams Controller hit!");

        this.database
            .addTeam(teamData)
            .then(() => {
                console.log("Team added!!");
            })
            .catch(() => {
                console.log("Failed to add team!");
            });
    }
}
