/*
 * Training Session Page
 *
 * Overview
 * This page is the crux of the Field Training application. From here, the coach will
 * be able to send his athletes into the field to run the route. The backend, behind the scenes
 * will keep track of everyone who has entered the field and as cones are tagged,
 * put together the whole picture of the times people are completing. The frontend is somewhat
 * minimal, but we will try and keep it easy to see who is on deck, along with the general
 * completion status of the earlier players
 *
 * UI Layout
 * The main area is a scrollable area, which should take up ~75% of the vertical space. It
 * shows each of the players (in the previously selected order). The "On Deck" player will
 * be shown in bold (or otherwise noted..). Each athlete who has started will have the
 * total number of cones they have reached noted next to them (updated in realtime).
 * When an athlete fully completes the course, they will become green (or otherwise noted).
 *
 * When all athletes are complete, the user will be able to navigate to the next screen which
 * will dispaly all of the information (whatever we think is cool, possibly multiple views).
 *
 * Technical Details
 * TBD
 *
 * Events
 * TBD
 *
 * Opens
 * Still need to figure out a good UX for managing players who, for whatever reason, need to drop
 * out of the training session (injury, fatigue, whatever). Perhaps the backend will detect
 * this automatically and we will just show the information at the beginning.
 *
 * We also need a way for the coach to throw away scores. If he sees an obvious error, he will
 * need to be able to toss the result, before its written to longer-term storage.
 *
*/

import { Component, OnInit } from "@angular/core";
import { AthleteSession, AthleteSessionArray } from "../../../../../../../smart-cone-api/src/Training/athlete-session";
import { SessionSetupService } from "../../services/session-setup.service";
import { SessionService } from "../../services/session.service";
import { SessionSetupData } from "../../models/session-setup-data";
import { Athlete } from "../../../../../../../smart-cone-api/src/Athletes/athlete";
import { Router } from "@angular/router";
import { TrainingSessionState } from "@SmartCone/Training/training-session-state";

@Component({
    selector: "ft-training-session-page",
    templateUrl: "./training-session-page.component.html",
    styleUrls: ["./training-session-page.component.css"],
})
export class TrainingSessionPageComponent implements OnInit {
    displayedColumns: string[] = ["id", "name"];
    onDeckAthlete: Athlete;
    sessionState: TrainingSessionState;
    sessionFieldData: SessionSetupData;

    constructor(
        private readonly sessionSetup: SessionSetupService,
        private readonly sessionService: SessionService,
        private readonly router: Router,
    ) {}

    ngOnInit() {
        // Get the on-deck athlete
        this.onDeckAthlete = this.sessionService.getOnDeckAthlete();
        // Subscribe for changes on the on-deck athlete
        this.sessionService.getCurrentAthleteObservable().subscribe(a => {
            this.onDeckAthlete = a;
        });

        // Get the current athleteSessions information (all info regarding all athletes status through the course)
        this.sessionState = this.sessionService.getAthleteSessions();
        console.log("hello");
        console.log(`Got ${this.sessionState.athleteSessions.sessions.length} phases.`);
        console.log(`Got ${this.sessionState.getCurrentSession().athleteSessions.length} athlete sessions!`);

        // Subscribe for changes about the athlete session state
        this.sessionService.getAthleteSessionsObservable().subscribe((sessionState: TrainingSessionState) => {
            console.log(`Received ${sessionState.getCurrentSession().athleteSessions.length} athlete sessions!`);
            console.log(sessionState);
            this.sessionState = sessionState;
        });

        // Get the field data (course, cones, name, etc)
        this.sessionFieldData = this.sessionSetup.getSessionSetupData();
        console.log(this.sessionFieldData);
    }

    async onGo() {
        // only do the "nextAthlete" logic if we are not yet complete
        if (this.sessionService.sessionComplete()) {
            // in this case navigate user to the results page
            this.router.navigateByUrl("/training/results");
        }
        try {
            if (this.onDeckAthlete) {
                await this.sessionService.nextAthlete();
            }
        } catch (err) {
            // did not work.
        }
    }

    onSwipe(event: any) {}

    getNextAthleteName(): string {
        return this.buttonText();
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
                return "Session Done";
            } else {
                return "Waiting for Athletes to Finish";
            }
        }
    }
}
