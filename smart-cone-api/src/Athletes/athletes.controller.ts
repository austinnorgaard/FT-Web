import { Controller, Post, Body, Get, HttpStatus, Delete, Query, Param } from "@nestjs/common";
import { AthleteRegistration } from "./athlete-registration";
import { AthletesService } from "./athletes.service";
import { Athlete } from "./athlete";
import { HttpException } from "@nestjs/common";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { TeamsService } from "../Teams/teams.service";
import { FileLogger } from "../Logging/file-logger";

@Controller("athletes")
export class AthletesController {
    constructor(private athletesService: AthletesService, private teamsService: TeamsService, private logger: FileLogger) {}
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
                            this.logger.log("Successfully added to team as well");
                        })
                        .catch(err => {
                            this.logger.log(err);
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
                this.logger.log(`Failed to add athlete. Reason: ${JSON.stringify(err)}`);
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
                this.logger.log(`Failed to get athletes. Reason: ${JSON.stringify(err)}`);
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Get(":id")
    async getAthlete(@Param("id") id: number) {
        return await this.athletesService.getAthlete(id);
    }

    @Delete(":id")
    async deleteAthlete(@Param("id") id: number) {
        this.logger.log(`Removing athlete with id ${id}`);

        return await this.athletesService
            .removeAthleteById(id)
            .then(response => {
                return;
            })
            .catch(err => {
                this.logger.log(`Database error removing athlete: ${err}`);
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
