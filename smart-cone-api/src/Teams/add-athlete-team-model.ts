import { Athlete } from "../Athletes/athlete";
import { Team } from "./Team";
import { IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AddAthleteTeamModel {
    @ValidateNested()
    @Type(() => Team)
    @IsDefined()
    athlete: Athlete;

    @ValidateNested()
    @Type(() => Team)
    @IsDefined()
    team: Team;
}
