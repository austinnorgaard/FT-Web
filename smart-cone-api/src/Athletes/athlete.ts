import { IsString, IsOptional, IsNumber, ValidateNested } from "class-validator";
import { Parent } from "./parent";
import { Team } from "../Teams/team";
import { Type } from "class-transformer";

export abstract class Athlete {
    @IsNumber() id: number;

    @IsString() firstName: string;

    @IsString() lastName: string;

    @IsString() email: string;

    @IsString() gender: string;

    @IsNumber() weight: number;

    @IsString() height: string;

    @IsOptional() parent1Name: string;
    @IsOptional() parent1Email: string;
    @IsOptional() parent1Phone: string;

    @IsOptional() parent2Name: string;
    @IsOptional() parent2Email: string;
    @IsOptional() parent2Phone: string;

    @ValidateNested()
    @Type(() => Team)
    teams: Team[];
}
