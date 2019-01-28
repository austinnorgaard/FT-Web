import { Observable } from "rxjs";
import { ClassType } from "./event-subject-map";
import { MessageBroker } from "./message-broker";

export class SocketMessageBroker<SocketTy> extends MessageBroker {
    // the socket we are wrapping
    private socket: SocketTy | any; // trust that user passes in a socket-io conforming type??

    constructor(socket: SocketTy) {
        super();
        this.socket = socket;
    }

    public RegisterEventObservable<PayloadTy>(eventName: string, type: ClassType<PayloadTy>): Observable<PayloadTy> {
        const observable = this.RegisterMapping(eventName, type, typeof type !== "undefined");
        console.log(`Registering event ${eventName}`);
        if (this.socket) {
            this.socket.on(eventName, payload => {
                this.HandleIncomingData(eventName, payload);
            });
        }
        return observable;
    }
}
