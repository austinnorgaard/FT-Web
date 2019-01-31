import { IsString, IsBoolean, IsOptional, IsNumber } from "../../../field-trainer/field-trainer/node_modules/class-validator";

export abstract class User {
    @IsOptional()
    @IsNumber()
    id?: number;
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsString() address1: string;
    @IsString() address2: string;
    @IsString() city: string;
    @IsString() state: string;
    @IsString() zipCode: string;
    @IsString() country: string;
    @IsString() phoneNumber: string;
    @IsString() email: string;
    @IsBoolean() subscribedToNewsLetter: boolean;

    constructor() {}
}
