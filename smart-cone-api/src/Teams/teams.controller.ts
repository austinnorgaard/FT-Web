import { Controller, Post, Get, Body, HttpStatus, HttpException, Put, Query, Param, Delete } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { Team } from "./team";
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
                return response;
            })
            .catch(err => {
                console.log(`Failed to get teams. Reason: ${JSON.stringify(err)}`);
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Get(":id")
    async getTeamById(@Param("id") id: number) {
        // get the team with a specific id
        return await this.teamsService
            .getTeamById(id)
            .then((team: Team) => {
                return team;
            })
            .catch((err: DatabaseResponse) => {
                console.log(`Failed to get team with id ${id}. Reason: ${JSON.stringify(err)}`);
                throw new HttpException(`Team with id ${id} was not found.`, HttpStatus.NOT_FOUND);
            });
    }

    @Put(":teamId/athletes/:athleteId")
    async addAthleteToTeam(@Param("teamId") teamId: number, @Param("athleteId") athleteId: number) {
        console.log("Add-athlete");
        return await this.teamsService
            .addAthleteToTeam(teamId, athleteId)
            .then(response => {
                console.log("Athlete added successfully.");
                return response;
            })
            .catch((response: DatabaseResponse) => {
                console.log(`Failed to add athlete to team. Reason: ${JSON.stringify(response)}`);
                throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Delete(":teamId/athletes/:athleteId")
    async removeAthleteFromTeam(@Param("teamId") teamId: number, @Param("athleteId") athleteId: number) {
        console.log("Remove athlete");
        return await this.teamsService
            .removeAthleteFromTeam(teamId, athleteId)
            .then(response => {
                console.log("Athlete removed successfully.");
                return response;
            })
            .catch((response: DatabaseResponse) => {
                console.log(`Failed to remove athlete from team. Reason: ${JSON.stringify(response)}`);
                throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
