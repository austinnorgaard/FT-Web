import { Athlete } from "../Athletes/athlete";
import { Segment } from "./segment";
import { FieldConeInfo } from "../FieldCones/field-cone-info";
import { Type } from "../../../field-trainer/field-trainer/node_modules/class-transformer";
import { IsArray, ValidateNested } from "../../../field-trainer/field-trainer/node_modules/class-validator";

// Session data for a single athlete during training

export class SegmentArray {
    @Type(() => Segment)
    @IsArray()
    @ValidateNested()
    items: Array<Segment>;

    constructor(segments?: Array<Segment>) {
        if (segments) {
            this.items = segments;
        } else {
            this.items = [];
        }
    }
}

export class AthleteSessionArray {
    @Type(() => AthleteSession)
    @IsArray()
    @ValidateNested()
    public items: Array<AthleteSession>;

    constructor() {
        this.items = [];
    }
}

export class AthleteSession {
    @Type(() => Athlete)
    @ValidateNested()
    public athlete: Athlete;

    @IsArray()
    @Type(() => Segment)
    @ValidateNested()
    public segments: Array<Segment>;

    public started: boolean;
    constructor(athlete: Athlete, segments: Array<Segment>, started: boolean) {
        this.athlete = athlete;
        this.segments = segments;
        this.started = started;
    }
}
