import {
    IsString,
    IsOptional,
    IsNumber,
    ValidateNested,
    IsPhoneNumber,
} from "class-validator";
import { Team } from "../Teams/team";
import { Type } from "class-transformer";

function t() {
    return Team;
}

export class Athlete {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsString() firstName: string;

    @IsString() lastName: string;

    @IsOptional() @IsString() email: string;

    @IsPhoneNumber("US") phoneNumber: string;

    @IsString() gender: string;

    @IsNumber() weight: number;

    @IsNumber() height: number;

    @IsOptional() parent1Name: string;
    @IsOptional() parent1Email: string;
    @IsOptional() parent1Phone: string;

    @IsOptional() parent2Name: string;
    @IsOptional() parent2Email: string;
    @IsOptional() parent2Phone: string;

    @ValidateNested()
    @Type(t)
    teams: Team[];
}

export class BlahDto {
    @IsNumber()
    id: number;
}
