import { FieldCone } from "./field-cone";
import { Field } from "./field";

export class Course {
    public constructor(public field: Field, public segments: CourseSegment[], public conesSubset: number[], public name: string) {
        this.field = field;
        this.field.cones = field.cones;
    }
}

export class CourseSegment {
    public constructor(public from: number, public to: number, public action: string) {}
}
