import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Segment } from "@SmartCone/Training/segment";
import { AthleteSession, AthleteSessionArray } from "@SmartCone/Training/athlete-session";
import { Router, NavigationEnd } from "@angular/router";
import { Athlete } from "@SmartCone/Athletes/athlete";

@Component({
    selector: "ft-session-details-page",
    templateUrl: "./session-details-page.component.html",
    styleUrls: ["./session-details-page.component.css"],
})
export class SessionDetailsPageComponent implements OnInit {
    public allSessions: AthleteSessionArray = null;
    public athleteId = -1;
    public loaded = false;

    /// key -> value
    /// athleteId -> arrayIndex
    private athleteIdMap: Array<any> = [];
    private onDeckAthlete: Athlete = null;

    private navigateSub;

    constructor(private readonly sessionService: SessionService, private router: Router) {
        this.sessionService.getAthleteSessionsObservable().subscribe(sessions => {
            if (sessions.items.length === 0) {
                // garbage design :(
                return;
            }

            this.athleteIdMap = [];
            let i = 0;
            sessions.items.forEach(session => {
                this.athleteIdMap.push({ id: session.athlete.id, index: i });
                i++;
            });

            this.allSessions = sessions;
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
        for (let i = 0; i < this.allSessions.items.length; ++i) {
            if (this.allSessions.items[i].athlete === this.currentAthlete()) {
                // check if the next athlete is not out of bounds..
                if (i + 1 < this.allSessions.items.length) {
                    await this.router.navigateByUrl(`training-session/${this.allSessions.items[i + 1].athlete.id}`);
                    return;
                }
                // otherwise, we should just route to athlete #0, as we've wrapped
                await this.router.navigateByUrl(`training-session/${this.allSessions.items[0].athlete.id}`);
                return;
            }
        }
    }

    async onLeft() {
        for (let i = 0; i < this.allSessions.items.length; ++i) {
            if (this.allSessions.items[i].athlete === this.currentAthlete()) {
                if (i - 1 >= 0) {
                    await this.router.navigateByUrl(`training-session/${this.allSessions.items[i - 1].athlete.id}`);
                    return;
                }
                // otherwise, we should just route to athlete #0, as we've wrapped
                await this.router.navigateByUrl(`training-session/${this.allSessions.items[this.allSessions.items.length - 1].athlete.id}`);
                return;
            }
        }
    }

    currentAthlete() {
        if (this.athleteId === -1) {
            return null;
        }
        if (this.allSessions === null) {
            return null;
        }
        return this.allSessions.items[this.getIndexFromId(this.athleteId)].athlete;
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
            console.log("In the else!");
            //            const allSessionsComplete = this.allSessions.items.every(session => session.segments.every(segment => segment.completed === true));
            let allSessionsComplete = true;

            console.log(`Checking ${this.allSessions.items.length} sessions!`);

            this.allSessions.items.forEach(session => {
                if (!allSessionsComplete) {
                    return;
                }
                session.segments.forEach(segment => {
                    if (segment.completed === false) {
                        allSessionsComplete = false;
                        return;
                    }
                });
            });

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
