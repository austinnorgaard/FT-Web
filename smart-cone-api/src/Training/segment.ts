import { IsDate } from "class-validator";

// Represents the action someone must take between two cones

export class Segment {
    from: number;
    to: number;
    action: string;
    completed: boolean;
    @IsDate()
    startTime: Date;
    @IsDate()
    endTime: Date;
}
