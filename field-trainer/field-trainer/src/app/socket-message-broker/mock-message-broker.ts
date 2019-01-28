import { MessageBroker } from "./message-broker";
import { Observable, Subject } from "rxjs";
import { ClassType } from "./event-subject-map";

export class MockMessageBroker extends MessageBroker {
    private payload: any = undefined;
    private eventName: string = undefined;

    private trigger = new Subject<{}>();

    RegisterEventObservable<PayloadTy>(eventName: string, type: ClassType<PayloadTy>): Observable<PayloadTy> {
        const observable = this.RegisterMapping(eventName, type, typeof type !== "undefined");

        // we are faking the callback, so just use a timer
        this.trigger.asObservable().subscribe(data => {
            // message received, if the payload wasn't set, we should throw
            if (!this.eventName) {
                throw new Error("Payload or Event Name wasn't set in Mock Message Broker.");
            }
            this.HandleIncomingData(this.eventName, this.payload);
        });

        return observable;
    }

    // For testing purposes, this is the data which will be "received"
    SetEventData(eventName: string, payload: any) {
        this.payload = payload;
        this.eventName = eventName;
    }

    public async TriggerIncomingData() {
        await this.HandleIncomingData(this.eventName, this.payload);
    }

    public TriggerEvent() {
        this.trigger.next({});
    }
}
