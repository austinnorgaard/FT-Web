import { Player } from './player';
import { TrainingCourse } from './training-course';
import { clone } from '../utility';

export class PlayerSession {
    /*
    * @player - Player for this session
    * @course - The course the player is going to be running
    * @started - Whethered the player has started their session
    */
    constructor(public player?: Player, public course?: TrainingCourse, public started?: boolean) {}

    create(player: Player, course: TrainingCourse): void {
        this.course = clone(course);
        this.player = clone(player);
        this.started = false;
    }
}
