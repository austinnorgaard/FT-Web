import { Observable, Subject } from "rxjs";

export abstract class BaseTiltService {
    // Provide an observable from which consumers of this class
    // can be notified when tilt events occur
    public TiltOccured: Subject<void> = new Subject<void>();
}
