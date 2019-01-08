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
import { AthleteSession } from "../../models/athlete-session";
import { SessionSetupService } from "../../services/session-setup.service";
import { SessionService } from "../../services/session.service";
import { SessionSetupData } from "../../models/session-setup-data";
import { Athlete } from "../../../../../../../smart-cone-api/src/Athletes/athlete";

@Component({
    selector: "ft-training-session-page",
    templateUrl: "./training-session-page.component.html",
    styleUrls: ["./training-session-page.component.css"],
})
export class TrainingSessionPageComponent implements OnInit {
    displayedColumns: string[] = ["id", "name"];
    onDeckAthlete: Athlete;
    athleteSessions: AthleteSession[] = [];
    sessionFieldData: SessionSetupData;

    constructor(private readonly sessionSetup: SessionSetupService, private readonly sessionService: SessionService) {}

    ngOnInit() {
        // Get the on-deck athlete
        this.onDeckAthlete = this.sessionService.getOnDeckAthlete();

        // Subscribe for changes on the on-deck athlete
        this.sessionService.getCurrentAthleteObservable().subscribe(a => {
            this.onDeckAthlete = a;
        });

        // Get the current athleteSessions information (all info regarding all athletes status through the course)
        this.athleteSessions = this.sessionService.getAthleteSessions();
        console.log(this.athleteSessions);

        // Subscribe for changes about the athlete session state
        this.sessionService.getAthleteSessionsObservable().subscribe(sessions => {
            console.log(`Received ${sessions.length} athlete sessions!`);
            this.athleteSessions = sessions;
        });

        // Get the field data (course, cones, name, etc)
        this.sessionFieldData = this.sessionSetup.getSessionSetupData();
        console.log(this.sessionFieldData);
    }

    onGo() {
        console.log("Next player go!!");
    }

    onSwipe(event: any) {
        console.log("hello!");
    }
}
