import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Player } from "../models/player";
import { PlayersService } from "../api/players.service";

@Component({
    selector: "ft-player",
    templateUrl: "./player.component.html",
    styleUrls: ["./player.component.css"],
})
export class PlayerComponent {
    @Input() player: Player;

    @Output() playerRemoved: EventEmitter<void> = new EventEmitter<void>();

    constructor(private playersService: PlayersService) {}

    onClick() {
        this.playersService.removePlayer(this.player.name).then(() => {
            this.playerRemoved.emit();
        });
    }
}
