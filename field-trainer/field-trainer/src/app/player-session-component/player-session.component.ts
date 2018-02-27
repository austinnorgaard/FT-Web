import { Component, Input, OnInit } from "@angular/core";
import { PlayerSession } from "../models/player-session";
import { getCurrentTime } from "../utility";
import { PlayerSessionService } from "../api/player-session.service";
@Component({
    selector: "ft-player-session",
    templateUrl: "./player-session.component.html",
    styleUrls: ["./player-session.component.css"]
})
export class PlayerSessionComponent implements OnInit {
    @Input() data: PlayerSession;

    ngOnInit(): void {
        // grab the current cones
    }

    constructor(private playerSessionService: PlayerSessionService) {}

    startClicked(): void {
        console.log(
            `Starting session for ${
                this.data.player.name
            } at ${getCurrentTime()}!`
        );

        this.playerSessionService
            .startSession(this.data.player.uuid)
            .then(() => {
                console.log("session started!");
            });
    }
}
