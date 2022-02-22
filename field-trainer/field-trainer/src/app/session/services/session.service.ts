import { Injectable, OnInit } from "@angular/core";

import "rxjs/add/operator/toPromise";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { SessionSetupService } from "./session-setup.service";
import { HttpHelperService } from "../../misc/services/http-helper.service";
import { AthleteSession, SegmentArray } from "../../../../../../smart-cone-api/src/Training/athlete-session";
import { SocketMessageBrokerService } from "../../socket-message-broker/socket-message-broker.service";
import { TrainingSessionState } from "@SmartCone/Training/training-session-state";
import { plainToClass } from "class-transformer";

@Injectable({ providedIn: "root" })
export class SessionService {
    private currentAthlete: BehaviorSubject<Athlete> = new BehaviorSubject<Athlete>(null);
    private athleteSessions: BehaviorSubject<TrainingSessionState> = new BehaviorSubject<TrainingSessionState>(new TrainingSessionState());
    private _athleteSessions: TrainingSessionState = new TrainingSessionState();

    private _sessionComplete = false;

    constructor(
        private sessionSetupService: SessionSetupService,
        private readonly http: HttpHelperService,
        private readonly broker: SocketMessageBrokerService,
    ) {
        this.broker.broker.RegisterEventObservable("sessionStateChanged", TrainingSessionState).subscribe((athleteSessions: TrainingSessionState) => {
            console.log("Received session state change !!");
            console.log(athleteSessions);
            // before moving on, turn all of the dates in the segments back into date objects
            // type isn't maintained over the wire (way to automate this..??)
            this.handleSessionStateChanged(athleteSessions);
        });

        this.broker.broker.RegisterEventObservable("sessionComplete", TrainingSessionState).subscribe((athleteSessions: TrainingSessionState) => {
            console.log("Session complete!!");

            this._sessionComplete = true;
        });

        // See if the backend has an existing session state
        this.http.get("/training").then((sessionState: TrainingSessionState) => {
            console.log("Got response.");
            // check if its valid
            if (sessionState.athleteSessions && sessionState.athleteSessions.sessions.length > 0) {
                console.log("Got an existing AthleteSessionArray state!");
                this.handleSessionStateChanged(sessionState);
            }
        });
    }

    private handleSessionStateChanged(sessionState: TrainingSessionState) {
        this._athleteSessions = plainToClass(TrainingSessionState, sessionState);
        this.athleteSessions.next(this._athleteSessions);

        // update the next athlete up
        const session = this._athleteSessions.getCurrentSession().athleteSessions.find((a) => a.started === false);
        if (session) {
            this.currentAthlete.next(session.athlete);
        } else {
            this.currentAthlete.next(null); // sentinel value, if the next athlete is null we can show the done state
        }
    }

    // Call this when ready to start the session (all setup is done)
    async start() {
        this._sessionComplete = false;
        console.log("Session service init!");
        const sessionData = this.sessionSetupService.getSessionSetupData();
        /*console.log(`sessionData: `, sessionData);
        // create all of the required athlete sessions
        this._athleteSessions = new TrainingSessionState();
        console.log(this._athleteSessions);

        sessionData.athletes.forEach(athlete => {
            console.log("adding an athlete session..");
            this._athleteSessions.items.push(new AthleteSession(athlete, [], false));
        });

        console.log("done, athleteSessions looks like ", this._athleteSessions);

        // Setup our subject values
        // First athlete in athlete sesions is our on deck athlete
        console.log("emitting the current athlete to be: ", this._athleteSessions.items[0].athlete);*/
        //this.currentAthlete.next(this._athleteSessions.items[0].athlete);

        // We'll keep any observers updated for the exact current state of athlete
        // sessions
        //this.athleteSessions.next(this._athleteSessions);
        try {
            this.http.post("/training/start-session", sessionData);

            console.log("Session started.");
        } catch (err) {
            console.log("Failed to start session!!", err);
        }
    }

    public async updateFromBackend() {
        let _athleteSessions = await this.http.get<TrainingSessionState>("/training");
    }

    /**
     *  getCurrentAthletObservable: Observable<Athlete>
     */
    public getCurrentAthleteObservable(): Observable<Athlete> {
        return this.currentAthlete.asObservable();
    }

    public getAthleteSessionsObservable(): Observable<TrainingSessionState> {
        return this.athleteSessions.asObservable();
    }

    public async getAthleteSessions(): Promise<TrainingSessionState> {
        return await this.http.get<TrainingSessionState>("/training");
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

    public sessionComplete(): boolean {
        return this._sessionComplete;
    }

    // Some assumption that the current state of results as the backend sees it (and thus this service
    // sees it) is the correct state. This request just makes the backend take a snapshot of the results
    public async saveResults() {
        await this.http.post<any>("/training/save-results", {});
    }
}
