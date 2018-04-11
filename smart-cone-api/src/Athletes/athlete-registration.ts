import { Athlete } from "./athlete";
import { Team } from "../Teams/Team";
import { IsOptional, ValidateNested, IsDefined } from "class-validator";
import { Type } from "class-transformer";

export abstract class AthleteRegistration {
    @ValidateNested()
    @Type(() => Athlete)
    @IsDefined()
    athlete: Athlete;

    @ValidateNested()
    @Type(() => Team)
    @IsOptional() team: Team;
}
