import { Component, OnInit } from '@angular/core';
import { PlayerSession } from '../player-session';
import { ConesService } from '../cones.service';
import { PlayersService } from '../players.service';

import { Cone } from '../cone';
import { Player } from '../player';

@Component({
  selector: 'ft-session',
  templateUrl: './ft-session.component.html',
  styleUrls: ['./ft-session.component.css']
})
export class FTSessionComponent implements OnInit {
    player_sessions: PlayerSession[] = [];
    cones: Cone[];
    players: Player[];

    constructor(private conesService: ConesService,
                private playersService: PlayersService) {}

    ngOnInit(): void {
        // query for all players and cones
        // after we get these, create
        // a list of PlayerSessions
        Promise.all(
            [
                this.conesService.getCones().then(cones =>
                    this.cones = cones),
                this.playersService.getPlayers().then(players =>
                    this.players = players)
            ]
        ).then(value => {
            console.log(this.cones);
            console.log(this.players);

            this.players.forEach(player => {
                console.log('Creating for ' + player.name);
                var session: PlayerSession = new PlayerSession();
                session.create(player, this.cones);
                this.player_sessions.push(session);
            })

            console.log('Created ' + this.player_sessions.length + ' player sessions.');
            console.log(this.player_sessions);
        });
    }
}
