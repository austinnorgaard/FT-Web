import { IsString } from "class-validator";

export abstract class Parent {
    @IsString() name: string;

    @IsString() phone: string;

    @IsString() email: string;
}
