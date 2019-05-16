import { IsString } from "class-validator";

export abstract class Parent {
    @IsString() name: string;

    @IsString() phone: string;

    @IsString() email: string;

    constructor(name: string, phone: string, email: string) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}
