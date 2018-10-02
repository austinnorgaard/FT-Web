import { Controller, Post, Body, Get, HttpStatus, Delete, Query } from "@nestjs/common";
import { AthleteRegistration } from "./athlete-registration";
import { AthletesService } from "./athletes.service";
import { Athlete } from "./athlete";
import { HttpException } from "@nestjs/common";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { AthleteTeamSchema } from "../Database/Models/AthleteTeamSchema";
import { TeamsService } from "../Teams/teams.service";

@Controller("athletes")
export class AthletesController {
    constructor(private athletesService: AthletesService, private teamsService: TeamsService) {}
    @Post()
    async create(@Body() athlete: AthleteRegistration) {
        // call service to create athlete in db
        return await this.athletesService
            .addAthlete(athlete.athlete)
            .then(response => {
                // Check if we need to add this athlete to a team
                if (athlete.team && athlete.team !== null) {
                    // someone passed in a team, lets try and get the ID and add them
                    this.teamsService
                        .addAthleteToTeam(athlete.team.id, response.data.athleteId)
                        .then(() => {
                            console.log("Successfully added to team as well");
                        })
                        .catch(err => {
                            console.log(err);
                            // This is a serious error, we should probably blow up here
                            // this constitutes a serious problem with frontend as this should be
                            // impossible
                            throw Error(
                                `Could not add athlete ${athlete.athlete.firstName} ${athlete.athlete.lastName} to team ${athlete.team.teamName}`,
                            );
                        });
                }
            })
            .catch((err: DatabaseResponse) => {
                console.log(`Failed to add athlete. Reason: ${JSON.stringify(err)}`);
                if (err.failureType === DatabaseFailureType.UniqueConstraintViolated) {
                    throw new HttpException(err, HttpStatus.CONFLICT);
                } else {
                    throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            });
    }

    @Get()
    async getAthletes() {
        // call service to return athletes
        return await this.athletesService
            .getAthletes()
            .then((response: Athlete[]) => {
                return response;
            })
            .catch(err => {
                console.log(`Failed to get athletes. Reason: ${JSON.stringify(err)}`);
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Delete("by-id")
    async deleteAthlete(@Query("id") id: number) {
        console.log(`Removing athlete with id ${id}`);

        return await this.athletesService
            .removeAthleteById(id)
            .then(response => {
                return;
            })
            .catch(err => {
                console.log(`Database error removing athlete: ${err}`);
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
