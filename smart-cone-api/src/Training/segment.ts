import { IsDate, IsNumber, IsString, IsBoolean, IsOptional } from "class-validator";
import { Type, Transform } from "class-transformer";

import * as moment from "moment";

// Represents the action someone must take between two cones

export class Segment {
    @IsNumber()
    from: number;

    @IsNumber()
    to: number;

    @IsString()
    action: string;

    @IsBoolean()
    completed: boolean;

    @Type(() => Date)
    startTime: Date;

    @Type(() => Date)
    endTime: Date;

    @IsNumber()
    @IsOptional()
    duration: number;
}
