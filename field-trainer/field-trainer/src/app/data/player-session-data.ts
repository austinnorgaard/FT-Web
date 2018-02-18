/*
    Represents the state of players and their cones
    The front-end will set the state to the clear state
    at first. The SmartConeApi will at that point become
    the owner of the state which can be requested.
*/

import { Player } from "./player";
import { PlayerSession } from "./player-session";

export class PlayerSessionData {
    constructor(public sessions?: PlayerSession[]) {
        if (this.sessions === null) {
            this.sessions = [];
        }
    }

    static EmptyState() {
        return new PlayerSessionData([]);
    }
}
