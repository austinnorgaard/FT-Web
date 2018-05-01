import { Component, OnInit, Input } from "@angular/core";
import { PlayersService } from "../api/players.service";
import { Player } from "../models/player";
import { PlayerSession } from "../models/player-session";

@Component({
    selector: "ft-players",
    templateUrl: "./players.component.html",
    styleUrls: ["./players.component.css"],
})
export class PlayersComponent implements OnInit {
    players: Player[];
    player_sessions: PlayerSession[];
    player_name: string;

    constructor(private playersService: PlayersService) {
        this.player_name = "";
    }

    ngOnInit() {
        this.updatePlayers();
    }

    updatePlayers() {
        this.playersService.getPlayers().then(players => {
            this.players = players;
        });
    }

    onAddPlayerClick() {
        if (this.player_name === null || this.player_name === "") {
            return;
        }

        this.playersService.addPlayer(this.player_name).then(() => {
            this.player_name = "";
            this.updatePlayers();
        });
    }

    onPlayerRemove() {
        this.updatePlayers();
    }

    onPlayerMoved() {
        console.log("Player moved!");
    }
}
