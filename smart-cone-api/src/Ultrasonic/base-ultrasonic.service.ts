import{ Subject } from "rxjs";

export abstract class BaseUltrasonicService {
    public UltrasonicEvent: Subject<void> = new Subject<void>();

    protected _ultrasonicEnabled = 0;
    setUltrasonicEnabled(value: boolean): void {
        if (value) {
            console.log('Increasing ultrasonicEnabled count');
            this._ultrasonicEnabled++;
        } else {
            console.log('Decreasing ultrasonicEnabled count');
            this._ultrasonicEnabled--;
        }
    }

    ultrasonicEnabled(): boolean {
        return this._ultrasonicEnabled > 0;
    }
}
