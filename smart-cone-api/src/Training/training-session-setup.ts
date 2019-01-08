import { Field } from "./field";
import { Course } from "./course";
import { Athlete } from "../Athletes/athlete";

export class TrainingSessionSetup {
    // Which field are we using?
    field: Field;
    // Which course on this field?
    course: Course;
    // which athletes are running this course
    athletes: Athlete[];
}
