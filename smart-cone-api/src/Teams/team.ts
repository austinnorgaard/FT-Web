import { IsOptional, IsString, IsNumber } from "class-validator";
import { Athlete } from "../Athletes/athlete";

export class Team {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsString() teamName: string;

    @IsString() ageGroup: string;

    @IsString() teamGender: string;

    @IsOptional() teamAthletes: Athlete[];
}
