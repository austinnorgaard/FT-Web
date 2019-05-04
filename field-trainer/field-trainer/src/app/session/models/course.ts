import { FieldCone } from "./field-cone";
import { Field } from "./field";

export class Course {
    public constructor(public field: Field, public segmentCollection: SegmentCollection[], public conesSubset: number[], public name: string) {
        this.field = field;
        this.field.cones = field.cones;
    }
}

export class CourseSegment {
    public constructor(public from: number, public to: number, public action: string) {}
}

export class SegmentCollection {
    public constructor(public segments: CourseSegment[]) {

    }
}