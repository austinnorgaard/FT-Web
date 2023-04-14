import { Subject } from "rxjs";

export abstract class BaseUltrasonicService {
    public UltrasonicEvent: Subject<void> = new Subject<void>();
}