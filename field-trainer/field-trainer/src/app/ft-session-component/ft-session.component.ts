import { Component, OnInit } from '@angular/core';
import { PlayerSession } from '../data/player-session';
import { ConesService } from '../api/cones.service';
import { PlayersService } from '../api/players.service';

import { Cone } from '../data/cone';
import { Player } from '../data/player';

import * as io from 'socket.io-client';

@Component({
  selector: 'ft-session',
  templateUrl: './ft-session.component.html',
  styleUrls: ['./ft-session.component.css']
})
export class FTSessionComponent implements OnInit {
    player_sessions: PlayerSession[] = [];
    cones: Cone[];
    players: Player[];
    socket: SocketIOClient.Socket;

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

        this.socket = io.connect('192.168.1.11:4001');

        this.socket.on('test2', data => {
            console.log(data);
        });
    }

    onClick(): void {
        console.log('Trying to send test!');
        
        this.socket.emit('test', {message: 'This is from the client!'});
    }
}
