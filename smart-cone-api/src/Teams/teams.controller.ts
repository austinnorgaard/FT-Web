import { Controller, Post, Get, Body, HttpStatus, HttpException, Put } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { Team } from "./Team";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { AthleteSchema } from "../Database/Models/AthleteSchema";
import { AddAthleteTeamModel } from "./add-athlete-team-model";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";

@Controller("teams")
export class TeamsController {
    constructor(private teamsService: TeamsService) {}

    @Post()
    async create(@Body() team: Team) {
        return await this.teamsService
            .addTeam(team)
            .then(response => {
                console.log("Team added!!");
                return;
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

    @Get()
    async getTeams() {
        // returns all of the teams
        return await this.teamsService
            .getTeams()
            .then((response: Team[]) => {
                console.log(`Info ${JSON.stringify(response[0].teamAthletes)}`);
                console.log(`Returning ${response.length} teams.`);
                return response;
            })
            .catch(err => {
                console.log(`Failed to get teams. Reason: ${JSON.stringify(err)}`);
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Post("add-athlete")
    async addAthleteToTeam(@Body() data: AddAthleteTeamModel) {
        return await this.teamsService
            .addAthleteToTeam(data.team, data.athlete)
            .then(response => {
                console.log("Athlete added successfully.");
                return;
            })
            .catch((response: DatabaseResponse) => {
                console.log(`Failed to add athlete to team. Reason: ${JSON.stringify(response)}`);
                throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Put()
    async test() {
        TeamSchema.findOne({
            where: {
                teamName: "TestTeam2"
            }
        }).then(team => {
            // add an athlete based on a name
            AthleteSchema.findOne({
                where: {
                    firstName: "Keaton"
                }
            }).then(athlete => {
                console.log(`Found: ${athlete.firstName}`);
                team.$add("teamAthletes", athlete).then(response => {
                    console.log("Success");
                });
            });
        });
    }
}
