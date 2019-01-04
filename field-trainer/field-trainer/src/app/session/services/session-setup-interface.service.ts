import { Field } from "../models/field";
import { Course } from "../models/course";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { SessionSetupData } from "../models/session-setup-data";

export interface ISessionSetupService {
    setField(field: Field): void;
    setCourse(course: Course): void;
    setAthletes(athletes: Athlete[]): void;

    getSessionSetupData(): SessionSetupData;
}
