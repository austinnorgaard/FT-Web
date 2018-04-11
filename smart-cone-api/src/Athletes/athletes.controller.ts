import { Controller, Post, Body, Get, HttpStatus } from "@nestjs/common";
import { AthleteRegistration } from "./athlete-registration";
import { AthletesService } from "./athletes.service";
import { Athlete } from "./athlete";
import { HttpException } from "@nestjs/core";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";

@Controller("athletes")
export class AthletesController {
    constructor(private athletesService: AthletesService) {}
    @Post()
    async create(@Body() athlete: AthleteRegistration) {
        // call service to create athlete in db
        return await this.athletesService
            .addAthlete(athlete.athlete)
            .then(response => {
                console.log("Athlete added!");

                // TODO: If a team was set, update the team to add this player
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
                console.log(`Returning ${response.length} athletes.`);
                return response;
            })
            .catch(err => {
                console.log(`Failed to get athletes. Reason: ${JSON.stringify(err)}`);
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
