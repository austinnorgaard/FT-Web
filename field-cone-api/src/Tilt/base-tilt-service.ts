import { Observable } from "rxjs";

export abstract class BaseTiltService {
    // Provide an observable from which consumers of this class
    // can be notified when tilt events occur
    public TiltOccured: Observable<void> = new Observable<void>();
}
