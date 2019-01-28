import { Injectable, OnInit } from "@angular/core";

import "rxjs/add/operator/toPromise";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { SessionSetupService } from "./session-setup.service";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { AthleteSession } from "../../../../../../smart-cone-api/src/Training/athlete-session";
import { SocketMessageBrokerService } from "../../socket-message-broker/socket-message-broker.service";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AthleteSessionArray {
    @IsArray()
    @ValidateNested()
    @Type(() => AthleteSession)
    items: AthleteSession[];
}

@Injectable({ providedIn: "root" })
export class SessionService {
    private currentAthlete: BehaviorSubject<Athlete> = new BehaviorSubject<Athlete>(null);
    private athleteSessions: BehaviorSubject<AthleteSession[]> = new BehaviorSubject<AthleteSession[]>([]);
    private _athleteSessions: AthleteSession[] = [];

    constructor(
        private sessionSetupService: SessionSetupService,
        private readonly http: HttpHelperService,
        private readonly broker: SocketMessageBrokerService,
    ) {
        this.broker.broker.RegisterEventObservable("sessionStateChanged", AthleteSessionArray).subscribe((athleteSessions: AthleteSessionArray) => {
            console.log("Received session state change !!");
            // before moving on, turn all of the dates in the segments back into date objects
            // type isn't maintained over the wire (way to automate this..??)

            this._athleteSessions = athleteSessions.items;
            this.convertDates();
            this.athleteSessions.next(this._athleteSessions);

            // update the next athlete up
            const session = this._athleteSessions.find(a => a.started === false);
            if (session) {
                this.currentAthlete.next(session.athlete);
            } else {
                this.currentAthlete.next(null); // sentinel value, if the next athlete is null we can show the done state
            }
        });
    }

    convertDates() {
        this._athleteSessions.forEach(session => {
            session.segments.forEach(segment => {
                if (segment.startTime) {
                    segment.startTime = new Date(segment.startTime);
                    segment.endTime = new Date(segment.endTime);
                }
            });
        });
    }

    // Call this when ready to start the session (all setup is done)
    async start() {
        console.log("Session service init!");
        const sessionData = this.sessionSetupService.getSessionSetupData();
        // create all of the required athlete sessions
        this._athleteSessions = [];
        sessionData.athletes.forEach(athlete => {
            this._athleteSessions.push(new AthleteSession(athlete, [], false));
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
        try {
            const response = await this.http.post<any>("/training/next-athlete-starting", {});
        } catch (err) {
            // something went wrong
            console.log(err);
            throw err; // reject
        }
    }
}
