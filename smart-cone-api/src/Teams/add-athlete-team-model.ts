import { Athlete } from "../Athletes/athlete";
import { Team } from "./team";
import { IsDefined, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class AddAthleteTeamModel {
    @IsNumber() athleteId: number;

    @IsNumber() teamId: number;
}
