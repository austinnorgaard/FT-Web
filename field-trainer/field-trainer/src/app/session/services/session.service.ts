import { Injectable, OnInit } from "@angular/core";
import { PlayerSession } from "../models/player-session";

import "rxjs/add/operator/toPromise";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AthleteSession } from "../models/athlete-session";

@Injectable()
export class SessionService {
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

    public getAthleteSessions(): Observable<AthleteSession[]> {
        return this.athleteSessions.asObservable();
    }

    setState(sessions: PlayerSession[]) {}
}
