import { Component, OnInit } from '@angular/core';
import { PlayerSession } from '../data/player-session';
import { ConesService } from '../api/cones.service';
import { PlayersService } from '../api/players.service';
import { PlayerSessionData } from '../data/player-session-data';

import { Cone } from '../data/cone';
import { Player } from '../data/player';
import { HttpClient } from '@angular/common/http';

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
                private playersService: PlayersService,
                private http: HttpClient) {}

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

        var data = JSON.stringify(PlayerSessionData.EmptyState());
        console.log('sending: ' + data);

        // set the initial state
        this.http.post('http://192.168.1.11:3000/set_player_data', 
            PlayerSessionData.EmptyState())
            .subscribe(res => {
                console.log('Post done.');
                console.log(res);
                
            });
    }

    onClick(): void {
        this.http.post('http://192.168.1.11:3000/set_player_data', 
        {message: "This is from the front-end!"})
        .subscribe(res => {
            
        });
    }
}
