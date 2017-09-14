import { Player } from './player';
import { SessionCone } from './session-cone';
import { Cone } from './cone';

export class PlayerSession {
    constructor(public player?: Player, public cones?: SessionCone[]) {}

    create(player: Player, cones: Cone[]): void {
        this.cones = [];
        cones.forEach(cone => {
            var newCone = new SessionCone();
            newCone.cone = cone;
            newCone.triggered = false;
            this.cones.push(newCone);
        });
        this.player = player;
    }

    // toJSON() {
    //     return {
    //         player: this.player,
    //         cones: this.cones
    //     };
    // }
}