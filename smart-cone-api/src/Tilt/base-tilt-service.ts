import { Observable, Subject } from "rxjs";

export abstract class BaseTiltService {
    protected _tiltsEnabled = false;
    // Provide an observable from which consumers of this class
    // can be notified when tilt events occur
    public TiltOccured: Subject<void> = new Subject<void>();

    public setTiltsEnabled(value: boolean) {
        console.log(`Setting tilts enabled to: ${value}`);
        this._tiltsEnabled = value;
    }
}
