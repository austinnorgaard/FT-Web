/* 
    Represents the state of players and their cones
    The front-end will set the state to the clear state
    at first. The SmartConeApi will at that point become
    the owner of the state which can be requested.
*/

import { Player } from './player';
import { PlayerSession } from './player-session';
import { Cone } from './cone';
import { SessionCone } from './session-cone';

export class PlayerSessionData {
    constructor(public sessions?: PlayerSession[]) {
        if (this.sessions === null)
        {
            this.sessions = [];
        }
    }

    static EmptyState () {
        // var player = new Player('Keaton', 1);
        // var cone = new SessionCone(new Cone('Cone1', '192.168.1.11', 1), false);
        // var state = new PlayerSessionData([new PlayerSession(player, [cone])]);

        // return state;

        return new PlayerSessionData([]);
    }

    // toJSON() {
    //     return {
    //         sessions: this.sessions
    //     };
    // }
}

