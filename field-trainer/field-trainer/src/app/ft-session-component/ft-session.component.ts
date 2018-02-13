import { Component, OnInit } from '@angular/core';
import { PlayerSession } from '../data/player-session';
import { ConesService } from '../api/cones.service';
import { PlayersService } from '../api/players.service';
import { PlayerSessionData } from '../data/player-session-data';
import { Segment } from '../data/segment';
import { TrainingCourse } from '../data/training-course';

import { Cone } from '../data/cone';
import { Player } from '../data/player';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Socket } from 'ng-socket-io';

import * as io from 'socket.io';
import * as config from '../../../global-config';

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

        // We will hardcode the list of segments that make up the training course
        let segment_a: Segment = new Segment(1, 2, 'jog', false, 0.0);
        let segment_b: Segment = new Segment(2, 3, 'run', false, 0.0);
        let segment_c: Segment = new Segment(3, 4, 'walk', false, 0.0);
        let course: TrainingCourse = new TrainingCourse([segment_a, segment_b, segment_c]);

        this.playersService.getPlayers().then(players => {
            console.log(players);

            players.forEach(player => {
                console.log('Creating for ' + player.name);
                let session: PlayerSession = new PlayerSession();
                session.create(player, course);
                this.player_sessions.push(session);
            });

            console.log('Created ' + this.player_sessions.length + ' player sessions.');
            console.log(this.player_sessions);

            console.log('sending: ' + JSON.stringify(this.player_sessions));

            // set the initial state
            this.http.post(config.toSmartConeHttp('/set_player_data'),
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

        let self = this;

        this.socket.on('cone_state_changed', function () {
            // backend is telling us we need to retrieve
            // the current state
            console.log('Getting current data...');

            self.http.get<PlayerSession[]>(config.toSmartConeHttp('/get_player_data'))
                .subscribe(data => {
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
