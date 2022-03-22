import {
    IsString,
    IsOptional,
    IsNumber,
    ValidateNested,
    IsPhoneNumber,
} from "../../../field-trainer/field-trainer/node_modules/class-validator";
import { Team } from "../Teams/team";
import { Type } from "../../../field-trainer/field-trainer/node_modules/class-transformer";

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

    @IsOptional() @IsPhoneNumber("US") phoneNumber: string;

    @IsString() gender: string;

    @IsNumber() weight: number;

    @IsNumber() height: number;

    @IsString() ageGroup: string;

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
