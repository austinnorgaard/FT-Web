import { Observable, Subject } from "rxjs";

export abstract class BaseTiltService {
    // Provide an observable from which consumers of this class
    // can be notified when tilt events occur
    public TiltOccured: Subject<void> = new Subject<void>();

    protected _tiltsEnabled = 0;
    setTiltsEnabled(value: boolean): void {
        if (value) {
            console.log('Increasing tiltsEnabled count');
            this._tiltsEnabled++;
        } else {
            console.log('Decreasing tiltsEnabled count');
            this._tiltsEnabled--;
        }
    }

    tiltsEnabled(): boolean {
        return this._tiltsEnabled > 0;
    }
}
