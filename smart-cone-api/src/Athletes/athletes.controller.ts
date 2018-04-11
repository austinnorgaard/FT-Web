import { Controller, Post, Body, Get } from "@nestjs/common";
import { Athlete } from "./athlete";

@Controller("athletes")
export class AthletesController {
    @Post()
    async create(@Body() athlete: Athlete) {
        // call service to create athlete in db
    }

    @Get()
    async getAthletes() {
        // call service to return athletes
    }
}
