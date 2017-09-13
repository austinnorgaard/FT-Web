import { Player } from './player';
import { SessionCone } from './session-cone-component/session-cone';
import { Cone } from './cone';

export class PlayerSession {
    player: Player;
    cones: SessionCone[];

    create(player: Player, cones: Cone[]): void {
        this.cones = [];
        cones.forEach(cone => {
            this.cones.push({cone: cone, triggered: false});
        });
        this.player = player;
    }
}