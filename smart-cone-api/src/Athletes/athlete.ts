import { IsString, IsOptional, IsNumber, ValidateNested } from "class-validator";
import { Team } from "../Teams/team";
import { Type } from "class-transformer";

function t() {
    return Team;
}

export abstract class Athlete {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    gender: string;

    @IsNumber()
    weight: number;

    @IsString()
    height: string;

    @IsOptional()
    parent1Name: string;
    @IsOptional()
    parent1Email: string;
    @IsOptional()
    parent1Phone: string;

    @IsOptional()
    parent2Name: string;
    @IsOptional()
    parent2Email: string;
    @IsOptional()
    parent2Phone: string;

    @ValidateNested()
    @Type(t)
    teams: Team[];

    // Add more fields to check if we ever get concerned about collisions
    // But first/last and email has got to be pretty unique
    public isEqualTo(other: Athlete): boolean {
        return this.firstName === other.firstName && this.lastName === other.lastName && this.email === other.email;
    }
}
