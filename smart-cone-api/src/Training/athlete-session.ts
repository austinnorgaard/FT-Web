import { Athlete } from "../Athletes/athlete";
import { Segment } from "./segment";
import { FieldConeInfo } from "../FieldCones/field-cone-info";

// Session data for a single athlete during training

export class AthleteSession {
    athlete: Athlete;
    cones: FieldConeInfo[];
    segments: Segment[];
}
