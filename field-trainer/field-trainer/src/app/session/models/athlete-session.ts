import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";

export class AthleteSession {
    public constructor(public athlete?: Athlete, public conesReached?: number) {
        /* Add additional fields here as the need arises! */
    }
}
