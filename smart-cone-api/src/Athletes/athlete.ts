import { IsString, IsOptional } from "class-validator";
import { Parent } from "./parent";

export abstract class Athlete {
    @IsString() firstName: string;

    @IsString() lastName: string;

    @IsString() email: string;

    @IsString() gender: string;

    @IsString() weight: number;

    @IsString() height: string;

    @IsOptional() parent1Name: string;
    @IsOptional() parent1Email: string;
    @IsOptional() parent1Phone: string;

    @IsOptional() parent2Name: string;
    @IsOptional() parent2Email: string;
    @IsOptional() parent2Phone: string;
}
