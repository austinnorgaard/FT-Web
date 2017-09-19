import { Component, OnInit } from '@angular/core';
import { PlayerSession } from '../data/player-session';
import { ConesService } from '../api/cones.service';
import { PlayersService } from '../api/players.service';
import { PlayerSessionData } from '../data/player-session-data';

import { Cone } from '../data/cone';
import { Player } from '../data/player';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Socket } from 'ng-socket-io';

import * as io from 'socket.io';

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
                private playersService: PlayersService,
                private http: HttpClient,
                private socket: Socket,
                private ref: ChangeDetectorRef) {
                    this.ref.markForCheck();
                }

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

            console.log('sending: ' + JSON.stringify(this.player_sessions));
            
            // set the initial state
            this.http.post('http://192.168.1.11:3000/set_player_data', 
                this.player_sessions)
                .subscribe(res => {
                    console.log('Post done.');
                    console.log(res);
                    
                });
        });

        console.log('Try connect');

        this.socket.on('connect', function() {
            console.log('Connection from smart-cone-api!');
        });

        var self = this;

        this.socket.on('cone_state_changed', function () {
            // backend is telling us we need to retrieve
            // the current state
            console.log('Getting current data...');

            self.http.get<PlayerSession[]>('http://192.168.1.11:3000/get_player_data').subscribe(data => {
                console.log('Got player data!');
                self.player_sessions = data;

                console.log(self.player_sessions);
            });
        });
    }

    onClick(): void {
        console.log(this.player_sessions);
        
    }
}
