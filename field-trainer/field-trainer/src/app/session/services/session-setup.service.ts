import { Injectable } from "@angular/core";
import { ISessionSetupService } from "./session-setup-interface.service";
import { Field } from "../models/field";
import { Course } from "../models/course";
import { SessionSetupData } from "../models/session-setup-data";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";

@Injectable()
export class SessionSetupService implements ISessionSetupService {
    private field: Field;
    private course: Course;
    private athletes: Athlete[];

    constructor() {}

    setField(field: Field): void {
        this.field = field;
    }

    setCourse(course: Course): void {
        this.course = course;
    }
    setAthletes(athletes: Athlete[]): void {
        this.athletes = Object.assign(athletes);
    }
    getSessionSetupData(): SessionSetupData {
        return { field: this.field, course: this.course, athletes: this.athletes } as SessionSetupData;
    }
}
