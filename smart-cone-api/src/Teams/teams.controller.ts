import { Controller, Post, Get, Body, HttpStatus, HttpException } from "@nestjs/common";
import { AddTeamData } from "../../../field-trainer/field-trainer/src/app/models/add-team-data";
import { TeamsService } from "./teams.service";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";

@Controller("teams")
export class TeamsController {
    constructor(private teamsService: TeamsService) {}

    @Post()
    async create(@Body() teamData: AddTeamData) {
        return await this.teamsService
            .addTeam(teamData)
            .then(response => {
                console.log("Team added!!");
                return JSON.stringify(response);
            })
            .catch(reason => {
                console.log(`Failed to add team. Reason: ${JSON.stringify(reason)}`);
                if (reason.failureType === DatabaseFailureType.UniqueConstraintViolated) {
                    throw new HttpException(reason, HttpStatus.CONFLICT);
                } else {
                    throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            });
    }
}
