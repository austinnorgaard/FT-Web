import { IsString, IsOptional } from "class-validator";
import { Parent } from "./parent";

export abstract class Athlete {
    @IsString() firstName: string;

    @IsString() lastName: string;

    @IsString() email: string;

    @IsString() gender: string;

    @IsString() weight: number;

    @IsString() height: string;

    @IsOptional() parent1: Parent;

    @IsOptional() parent2: Parent;
}
