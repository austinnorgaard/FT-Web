import { Athlete } from "../Athletes/athlete";
import { Segment } from "./segment";
import { FieldConeInfo } from "../FieldCones/field-cone-info";

// Session data for a single athlete during training

export class AthleteSession {
    started: boolean = false;
    constructor(public athlete?: Athlete, public cones?: FieldConeInfo[], public segments?: Segment[]) {}
}
