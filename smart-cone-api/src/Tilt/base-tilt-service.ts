import { Observable, Subject } from "rxjs";

export abstract class BaseTiltService {
    // We keep a 'stack' of "Enabled" on the device, once we hit zero
    // we are no longer enabled
    protected _tiltsEnabled = 0;

    protected tiltsEnabled(): boolean {
        return this._tiltsEnabled > 0;
    }

    // Provide an observable from which consumers of this class
    // can be notified when tilt events occur
    public TiltOccured: Subject<void> = new Subject<void>();

    public setTiltsEnabled(value: boolean) {
        if (value) {
            console.log('Adding additional tilts enabled count');
            this._tiltsEnabled++;
        } else {
            console.log('Decreasing tilts enabled count');
            this._tiltsEnabled--;
        }
    }
}
