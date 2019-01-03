import { Injectable, OnInit } from "@angular/core";
import { PlayerSession } from "../models/player-session";

import "rxjs/add/operator/toPromise";
import { Course } from "../models/course";
import { Field } from "../models/field";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { SessionSetupData } from "../models/session-setup-data";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AthleteSession } from "../models/athlete-session";

@Injectable()
export class SessionService implements OnInit {
    private selectedCourse: Course;
    private selectedField: Field;
    private selectedAthletes: Athlete[];
    private currentAthlete: BehaviorSubject<Athlete> = new BehaviorSubject<Athlete>(null);
    private athleteSessions: BehaviorSubject<AthleteSession[]> = new BehaviorSubject<AthleteSession[]>([]);
    private _athleteSessions: AthleteSession[] = [];

    constructor() {}

    /**
     *  getCurrentAthletObservable: Observable<Athlete>
     */
    public getCurrentAthleteObservable(): Observable<Athlete> {
        return this.currentAthlete.asObservable();
    }

    public getSelectedCourse(): Course {
        return this.selectedCourse;
    }

    public getSelectedField(): Field {
        return this.selectedField;
    }

    public getAthleteSessions(): Observable<AthleteSession[]> {
        return this.athleteSessions.asObservable();
    }

    ngOnInit(): void {
        console.log("Session service on init!!");
    }

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

    setAthletes(athletes: Athlete[]): void {
        this.selectedAthletes = athletes;
        this.currentAthlete.next(this.selectedAthletes[0]);

        this._athleteSessions = [];
        athletes.forEach(a => {
            this._athleteSessions.push(new AthleteSession(a, 0));
        });

        this.athleteSessions.next(this._athleteSessions);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
