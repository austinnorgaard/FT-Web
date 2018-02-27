export class Segment {
    constructor(
        public cone_id_start: number,
        public cone_id_end: number,
        public action: string,
        public completed: boolean,
        public time: number
    ) {
        this.start_cone_triggered = false;
        this.end_cone_triggered = false;
        this.start_time = 0;
    }
    start_cone_triggered: boolean;
    end_cone_triggered: boolean;
    start_time: number;
}
