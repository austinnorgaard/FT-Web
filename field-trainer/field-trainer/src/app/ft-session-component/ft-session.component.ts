import { Component, OnInit } from "@angular/core";
import { PlayerSession } from "../models/player-session";
import { ConesService } from "../api/cones.service";
import { PlayersService } from "../api/players.service";
import { PlayerSessionData } from "../models/player-session-data";
import { Segment } from "../models/segment";
import { TrainingCourse } from "../models/training-course";

import { Cone } from "../models/cone";
import { Player } from "../models/player";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

import { Socket } from "ng-socket-io";

import * as io from "socket.io";
import { FT_CONFIG } from "../../../global-config";

@Component({
    selector: "ft-session",
    templateUrl: "./ft-session.component.html",
    styleUrls: ["./ft-session.component.css"]
})
export class FTSessionComponent implements OnInit {
    player_sessions: PlayerSession[] = [];
    cones: Cone[];
    players: Player[];

    constructor(
        private conesService: ConesService,
        private playersService: PlayersService,
        private http: HttpClient,
        private socket: Socket,
        private ref: ChangeDetectorRef
    ) {
        this.ref.markForCheck();
    }

    ngOnInit(): void {
        // query for all players and cones
        // after we get these, create
        // a list of PlayerSessions

        // We will hardcode the list of segments that make up the training course
        const segment_a: Segment = new Segment(1, 2, "jog", false, 0.0);
        const segment_b: Segment = new Segment(2, 3, "run", false, 0.0);
        const segment_c: Segment = new Segment(3, 4, "walk", false, 0.0);
        const course: TrainingCourse = new TrainingCourse([segment_a, segment_b, segment_c]);

        this.playersService.getPlayers().then(players => {
            console.log(players);

            players.forEach(player => {
                console.log("Creating for " + player.name);
                const session: PlayerSession = new PlayerSession();
                session.create(player, course);
                this.player_sessions.push(session);
            });

            console.log("Created " + this.player_sessions.length + " player sessions.");
            console.log(this.player_sessions);

            console.log("sending: " + JSON.stringify(this.player_sessions));

            // set the initial state
            this.http.post(FT_CONFIG.toSmartConeHttp("/set_player_data"), this.player_sessions).subscribe(res => {
                console.log("Post done.");
                console.log(res);
            });
        });

        console.log("Try connect");

        this.socket.on("connect", function() {
            console.log("Connection from smart-cone-api!");
        });

        const self = this;

        this.socket.on("cone_state_changed", function() {
            // backend is telling us we need to retrieve
            // the current state
            console.log("Getting current data...");

            self.http.get<PlayerSession[]>(FT_CONFIG.toSmartConeHttp("/get_player_data")).subscribe(data => {
                console.log("Got player data!");
                self.player_sessions = data;

                console.log(self.player_sessions);
            });
        });
    }

    onClick(): void {
        console.log(this.player_sessions);
    }
}
