import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Segment } from "@SmartCone/Training/segment";
import { AthleteSession } from "@SmartCone/Training/athlete-session";
import { Router } from "@angular/router";

@Component({
    selector: "ft-session-details-page",
    templateUrl: "./session-details-page.component.html",
    styleUrls: ["./session-details-page.component.css"],
})
export class SessionDetailsPageComponent implements OnInit {
    public athleteSession: AthleteSession = null;
    private athleteId = -1;

    constructor(private readonly sessionService: SessionService, private router: Router) {
        console.log("SessionDetailsPageComponent!!");

        const splitRoute = this.router.url.split("/");

        // last one
        this.athleteId = parseInt(splitRoute[splitRoute.length - 1], 10);

        this.sessionService.getAthleteSessionsObservable().subscribe(sessions => {
            // only care about the sessions for the athlete on this page
            this.athleteSession = sessions.items.find(s => s.athlete.id === this.athleteId);

            if (this.athleteSession === undefined) {
                // freak out, this shouldn't happen (afaik)
                console.log(`Session Details Page couldnt find the athlete for this page... ${this.athleteId}`);
                return;
            }
        });
    }

    ngOnInit() {}

    onRight() {}

    onLeft() {}
}
