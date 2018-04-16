import { IsString, IsOptional } from "class-validator";
import { Athlete } from "../Athletes/athlete";

export abstract class Team {
    @IsString() teamName: string;

    @IsString() ageGroup: string;

    @IsString() teamGender: string;

    @IsOptional() teamAthletes: Athlete[];
}
