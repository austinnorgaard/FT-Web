import { Athlete } from "../Athletes/athlete";
import { Field } from "../../../field-trainer/field-trainer/src/app/session/models/field";
import { Course } from "../../../field-trainer/field-trainer/src/app/session/models/course";

export class TrainingSessionSetup {
    // Which field are we using?
    field: Field;
    // Which course on this field?
    course: Course;
    // which athletes are running this course
    athletes: Athlete[];
}
