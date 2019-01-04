import { Field } from "./field";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { Course } from "./course";

export interface SessionSetupData {
    field: Field;
    course: Course;
    athletes: Athlete[];
}
