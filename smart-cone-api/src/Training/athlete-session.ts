import { Athlete } from "../Athletes/athlete";
import { Segment } from "./segment";

// Session data for a single athlete during training

export class AthleteSession {
    athlete: Athlete;
    segments: Segment[];
}
