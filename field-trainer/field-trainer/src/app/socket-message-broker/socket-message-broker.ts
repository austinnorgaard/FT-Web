import { Subject, Observable } from "rxjs";
import { EventSubjectMap, ClassType } from "./event-subject-map";
import { plainToClassFromExist, plainToClass, deserialize } from "class-transformer";
import { validate } from "class-validator";
import { MessageBroker } from "./message-broker";

export class SocketMessageBroker<SocketTy> extends MessageBroker {
    // the socket we are wrapping
    private socket: SocketTy | any; // trust that user passes in a socket-io conforming type??

    constructor(socket: SocketTy) {
        super();
        this.socket = socket;
    }

    // public RegisterEventObservable<PayloadTy extends Array<any>>(eventName: string, type: ClassType<PayloadTy>): Observable<Array<PayloadTy>>;
    public RegisterEventObservable<PayloadTy>(eventName: string, type: ClassType<PayloadTy>): Observable<PayloadTy> {
        const observable = this.RegisterMapping(eventName, type, typeof type !== "undefined");
        if (this.socket) {
            this.socket.on(eventName, payload => {
                const mappings = this.mappings.filter(m => m.eventName === eventName);
                // early out for special events
                if (eventName === "connect") {
                    // just emit nothing on the subject as connect is just a "it occured" event
                    mappings.forEach(m => {
                        this.subjects[m.index].next({});
                    });
                    return;
                } else if (eventName === "disconnect") {
                    mappings.forEach(m => {
                        this.subjects[m.index].next({});
                    });
                    return;
                }

                // Check if this event is being tracked, if so, send this payload through
                // the transform-validate-emit flow
                // and leave
                mappings.forEach(mapping => {
                    if (mapping) {
                        this.TransformValidateEmitFlow(mapping, payload);
                    } else {
                        console.log(`Got event ${eventName} for which no handler was installed.`);
                    }
                });
            });
        }
        return observable;
    }

    public async TransformValidateEmitFlow(mapping: EventSubjectMap<any>, payload: any) {
        const transformedClass = deserialize(mapping.type, JSON.stringify(payload));
        const errors = await validate(transformedClass);
        if (errors.length !== 0) {
            console.log(JSON.stringify(errors, null, 2));
            throw new Error("DISASTER");
        }

        this.subjects[mapping.index].next(transformedClass);
    }
}
