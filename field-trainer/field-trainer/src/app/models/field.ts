import { FieldCone } from "./field-cone";

export class Field {
    public constructor(public cones: FieldCone[], public width: number, public height: number, public name: string) {}
}
