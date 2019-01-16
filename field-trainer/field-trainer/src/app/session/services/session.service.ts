import { Injectable, OnInit } from "@angular/core";
import { PlayerSession } from "../models/player-session";

import "rxjs/add/operator/toPromise";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AthleteSession } from "../models/athlete-session";
import { SessionSetupService } from "./session-setup.service";
import { HttpHelperService } from "../../misc/services/http-helper.service";

@Injectable({ providedIn: "root" })
export class SessionService {
    private currentAthlete: BehaviorSubject<Athlete> = new BehaviorSubject<Athlete>(null);
    private athleteSessions: BehaviorSubject<AthleteSession[]> = new BehaviorSubject<AthleteSession[]>([]);
    private _athleteSessions: AthleteSession[] = [];

    constructor(private sessionSetupService: SessionSetupService, private readonly http: HttpHelperService) {}

    // Call this when ready to start the session (all setup is done)
    async start() {
        console.log("Session service init!");
        const sessionData = this.sessionSetupService.getSessionSetupData();
        // create all of the required athlete sessions
        this._athleteSessions = [];
        sessionData.athletes.forEach(athlete => {
            this._athleteSessions.push(new AthleteSession(athlete, 0));
        });

        // Setup our subject values
        // First athlete in athlete sesions is our on deck athlete
        this.currentAthlete.next(this._athleteSessions[0].athlete);

        // We'll keep any observers updated for the exact current state of athlete
        // sessions
        this.athleteSessions.next(this._athleteSessions);
        try {
            await this.http.post("/training/start-session", sessionData);
            console.log("Session started.");
        } catch (err) {
            console.log("Failed to start session!!", err);
        }
    }

    /**
     *  getCurrentAthletObservable: Observable<Athlete>
     */
    public getCurrentAthleteObservable(): Observable<Athlete> {
        return this.currentAthlete.asObservable();
    }

    public getAthleteSessionsObservable(): Observable<AthleteSession[]> {
        return this.athleteSessions.asObservable();
    }

    public getAthleteSessions(): AthleteSession[] {
        return this._athleteSessions;
    }

    public getOnDeckAthlete(): Athlete {
        return this.currentAthlete.value;
    }

    public async nextAthlete() {
        // the on-deck athlete is up next
        await this.http.post("/training/next-athlete-starting", {});
    }
}
