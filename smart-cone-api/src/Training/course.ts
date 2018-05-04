import { Cone } from "./cone";
import { Segment } from "./segment";

export class Course {
    id: number;
    fieldId: number; // may be useful later
    cones: Cone[]; // some subset of cones from the field
    segments: Segment[];
}
