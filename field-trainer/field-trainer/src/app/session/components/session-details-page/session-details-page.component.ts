import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Segment } from "@SmartCone/Training/segment";
import { AthleteSession, AthleteSessionArray } from "@SmartCone/Training/athlete-session";
import { TrainingSessionState } from "@SmartCone/Training/training-session-state";
import { Router, NavigationEnd } from "@angular/router";
import { Athlete } from "@SmartCone/Athletes/athlete";

@Component({
    selector: "ft-session-details-page",
    templateUrl: "./session-details-page.component.html",
    styleUrls: ["./session-details-page.component.css"],
})
export class SessionDetailsPageComponent implements OnInit {
    public sessionState: TrainingSessionState = null;
    public athleteId = -1;
    public loaded = false;

    /// key -> value
    /// athleteId -> arrayIndex
    private athleteIdMap: Array<any> = [];
    private onDeckAthlete: Athlete = null;

    private navigateSub;

    constructor(private readonly sessionService: SessionService, private router: Router) {
        this.sessionService.getAthleteSessionsObservable().subscribe(sessionState => {
            if (sessionState.getCurrentSession().athleteSessions.length === 0) {
                // garbage design :(
                return;
            }

            this.athleteIdMap = [];
            let i = -1;
            sessionState.getCurrentSession().athleteSessions.forEach(session => {
                this.athleteIdMap.push({ id: session.athlete.id, index: i });
                i++;
            });

            this.sessionState = sessionState;
            this.loaded = true;
            this.init();
        });

        this.navigateSub = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.loaded = false;
                // reload
                this.init();
            }
        });

        this.sessionService.getCurrentAthleteObservable().subscribe((athlete: Athlete) => {
            this.onDeckAthlete = athlete;
        });
    }

    init() {
        // called every time we want to refresh the page (navigation)
        const splitRoute = this.router.url.split("/");
        this.athleteId = parseInt(splitRoute[splitRoute.length - 1], 10);
        this.loaded = true;
    }

    getIndexFromId(id: number): number {
        return this.athleteIdMap.find(item => item.id === id).index;
    }

    ngOnInit() {}

    async onRight() {
        // we need to determine which athlete is next, then route to that id
        for (let i = 0; i < this.sessionState.getCurrentSession().athleteSessions.length; ++i) {
            if (this.sessionState.getCurrentSession().athleteSessions[i].athlete === this.currentAthlete()) {
                // check if the next athlete is not out of bounds..
                if (i + 1 < this.sessionState.getCurrentSession().athleteSessions.length) {
                    await this.router.navigateByUrl(`training-session/${this.sessionState.getCurrentSession().athleteSessions[i + 1].athlete.id}`);
                    return;
                }
                // otherwise, we should just route to athlete #0, as we've wrapped
                await this.router.navigateByUrl(`training-session/${this.sessionState.getCurrentSession().athleteSessions[0].athlete.id}`);
                return;
            }
        }
    }

    async onLeft() {
        for (let i = 0; i < this.sessionState.getCurrentSession().athleteSessions.length; ++i) {
            if (this.sessionState.getCurrentSession().athleteSessions[i].athlete === this.currentAthlete()) {
                if (i - 1 >= 0) {
                    await this.router.navigateByUrl(`training-session/${this.sessionState.getCurrentSession().athleteSessions[i - 1].athlete.id}`);
                    return;
                }
                // otherwise, we should just route to athlete #0, as we've wrapped
                await this.router.navigateByUrl(
                    `training-session/${
                        this.sessionState.getCurrentSession().athleteSessions[this.sessionState.getCurrentSession().athleteSessions.length - 1]
                            .athlete.id
                    }`,
                );
                return;
            }
        }
    }

    currentAthlete() {
        if (this.athleteId === -1) {
            return null;
        }
        if (this.sessionState === null) {
            return null;
        }
        return this.sessionState.getCurrentSession().athleteSessions[this.getIndexFromId(this.athleteId)].athlete;
    }

    getNextAthleteString(): string {
        return this.buttonText();
    }

    async onGo() {
        // only do the "nextAthlete" logic if we are not yet complete
        if (this.sessionService.sessionComplete()) {
            // in this case navigate user to the results page
            this.router.navigateByUrl("/training/results");
        }
        try {
            // only send this if there are athletes remaining
            if (this.onDeckAthlete) {
                await this.sessionService.nextAthlete();
            }
        } catch (err) {
            // did not work.
        }
    }

    // If there is still an on-deck athlete, return the athletes name
    // Else, if there is no on-deck athlete, but all sessions are yet to be completed
    // return "Waiting for Athletes to Finish"
    // Else, return "Done. View Results"
    buttonText(): string {
        if (this.onDeckAthlete) {
            return `GO ${this.onDeckAthlete.firstName} ${this.onDeckAthlete.lastName}`;
        } else {
            const allSessionsComplete = this.sessionState
                .getCurrentSession()
                .athleteSessions.every(session => session.segments.every(segment => segment.completed === true));

            if (allSessionsComplete) {
                return "Done! View Results";
            } else {
                return "Waiting for Athletes to Finish";
            }
        }
    }

    back() {
        // just route back to the training-session page
        this.router.navigateByUrl("training-session");
    }
}
