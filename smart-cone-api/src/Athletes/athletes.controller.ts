import { Controller, Post, Body, Get } from "@nestjs/common";
import { AthleteRegistration } from "./athlete-registration";

@Controller("athletes")
export class AthletesController {
    @Post()
    async create(@Body() athlete: AthleteRegistration) {
        // call service to create athlete in db
    }

    @Get()
    async getAthletes() {
        // call service to return athletes
    }
}
