import { IsNumber } from "../../../field-trainer/field-trainer/node_modules/class-validator";
// Not meant to be serialized in database, model only
export class Cone {
    @IsNumber() id: number;

    @IsNumber() x: number;

    @IsNumber() y: number;
}
