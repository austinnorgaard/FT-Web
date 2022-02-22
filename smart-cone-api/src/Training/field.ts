import {
    IsNumber,
    ValidateNested,
} from "../../../field-trainer/field-trainer/node_modules/class-validator";
import { Type } from "../../../field-trainer/field-trainer/node_modules/class-transformer";
import { Cone } from "./cone";

export abstract class Field {
    @IsNumber() id: number;

    @ValidateNested()
    @Type(() => Cone)
    cones: Cone[];
}
