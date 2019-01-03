import { Player } from "./player";
import { TrainingCourse } from "./training-course";

export class PlayerSession {
    /*
    * @player - Player for this session
    * @course - The course the player is going to be running
    * @started - Whethered the player has started their session
    */
    constructor(public player?: Player, public course?: TrainingCourse, public started?: boolean, public segmentsCompleted?: number) {}

    create(player: Player, course: TrainingCourse): void {
        this.course = JSON.parse(JSON.stringify(course));
        this.player = JSON.parse(JSON.stringify(player));
        this.started = false;
        this.segmentsCompleted = 0;
    }
}
