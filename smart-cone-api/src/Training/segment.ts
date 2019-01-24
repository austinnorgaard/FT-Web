// Represents the action someone must take between two cones

export class Segment {
    from: number;
    to: number;
    action: string;
    completed: boolean;
    startTime: Date;
    endTime: Date;
}
