import { Segment } from "./segment";

/* A training course is a list of segments the player must traverse */

export class TrainingCourse {
    public constructor(public segments: Segment[]) {}
}
