import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Cone } from "../models/cone";
import { PlayerSession } from "../models/player-session";

import "rxjs/add/operator/toPromise";
import { Course } from "../models/course";
import { Field } from "../models/field";

@Injectable()
export class SessionService {
    private selectedCourse: Course;
    private selectedField: Field;

    constructor(private http: Http) {}

    setState(sessions: PlayerSession[]) {}

    /*
     * Sets the currently selected field and course, from when the user is about
     * to start a session.
     */
    setFieldAndCourse(field: Field, course: Course) {
        this.selectedField = field;
        this.selectedCourse = course;
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
