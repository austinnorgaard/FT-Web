import { Injectable } from "@angular/core";
import { PlayerSession } from "../models/player-session";

import "rxjs/add/operator/toPromise";
import { Course } from "../models/course";
import { Field } from "../models/field";
import { Athlete } from "../../../../../smart-cone-api/src/Athletes/athlete";
import { SessionSetupData } from "../models/session-setup-data";

@Injectable()
export class SessionService {
    private selectedCourse: Course;
    private selectedField: Field;
    private selectedAthletes: Athlete[];
    constructor() {}

    setState(sessions: PlayerSession[]) {}

    /*
     * Sets the currently selected field and course, from when the user is about
     * to start a session.
     */
    setFieldAndCourse(field: Field, course: Course) {
        this.selectedField = field;
        this.selectedCourse = course;
    }

    getCurrentSessionSetupState(): SessionSetupData {
        return { field: this.selectedField, course: this.selectedCourse, athletes: this.selectedAthletes };
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
