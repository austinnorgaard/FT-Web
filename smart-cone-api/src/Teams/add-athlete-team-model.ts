import { IsNumber } from "../../../field-trainer/field-trainer/node_modules/class-validator";

export class AddAthleteTeamModel {
    @IsNumber() athleteId: number;
}
