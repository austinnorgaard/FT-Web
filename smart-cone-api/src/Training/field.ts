import { IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Cone } from "./cone";

export abstract class Field {
    @IsNumber() id: number;

    @ValidateNested()
    @Type(() => Cone)
    cones: Cone[];
}
