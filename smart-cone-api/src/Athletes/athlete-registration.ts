import { Athlete } from "./athlete";
import { Team } from "../Teams/team";
import { IsOptional, ValidateNested, IsDefined } from "../../../field-trainer/field-trainer/node_modules/class-validator";
import { Type } from "../../../field-trainer/field-trainer/node_modules/class-transformer";

function a() {
    return Athlete;
}
function t() {
    return Team;
}
export abstract class AthleteRegistration {
    @ValidateNested()
    @Type(a)
    @IsDefined()
    athlete: Athlete;

    @ValidateNested()
    @Type(t)
    @IsOptional()
    team: Team;
}
