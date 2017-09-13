import { Component, Input, OnInit } from '@angular/core';
import { SessionCone } from '../session-cone-component/session-cone';
import { PlayerSession } from '../player-session';

@Component({
  selector: 'player-session',
  templateUrl: './player-session.component.html',
  styleUrls: ['./player-session.component.css']
})
export class PlayerSessionComponent implements OnInit {
    ngOnInit(): void {
        // grab the current cones
    }

    @Input()
    data: PlayerSession;
}
