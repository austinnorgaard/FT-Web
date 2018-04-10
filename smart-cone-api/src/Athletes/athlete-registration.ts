import { Athlete } from "./athlete";
import { Team } from "../Teams/Team";
import { IsOptional } from "class-validator";

export abstract class AthleteRegistration {
    athlete: Athlete;
    @IsOptional() team: Team;
}
