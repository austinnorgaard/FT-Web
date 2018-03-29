import { IsString } from "class-validator";

export abstract class Team {
    @IsString() teamName: string;

    @IsString() ageGroup: string;

    @IsString() teamGender: string;
}
