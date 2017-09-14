import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../api/players.service';
import { Player } from '../data/player';
import { PlayerSession } from '../data/player-session';


@Component({
    selector: 'players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
    players: Player[];
    player_sessions: PlayerSession[];

    constructor(private playersService: PlayersService) { }

    ngOnInit() {
        this.playersService.getPlayers().then(players => {
            console.log(players);
            this.players = players;
        });
    }

}
