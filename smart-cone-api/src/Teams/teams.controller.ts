import { Controller, Post, Get, Body, HttpStatus, HttpException, Put } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { Team } from "./Team";
import { TeamSchema } from "../Database/Models/TeamSchema";
import { AthleteSchema } from "../Database/Models/AthleteSchema";

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
