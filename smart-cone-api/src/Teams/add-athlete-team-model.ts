import { IsNumber } from "class-validator";

export class AddAthleteTeamModel {
    @IsNumber()
    athleteId: number;

    @IsNumber()
    teamId: number;
}
