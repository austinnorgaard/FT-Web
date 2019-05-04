import { AthleteSession } from "./athlete-session";
import { Field } from "./field";
import { Course } from "./course";

export class SessionResult {
    public constructor(public athleteSessions: AthleteSession[]) {}
}

export class SessionResultCollection {
    public constructor(public field: Field, public course: Course) {}
}
