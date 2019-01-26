import { Subject, Observable } from "rxjs";
import { EventSubjectMap } from "./event-subject-map";
import { plainToClassFromExist } from "class-transformer";
import { validate } from "class-validator";
import { Validators } from "@angular/forms";

export class SocketMessageBroker<SocketTy> {
    // internal book keeping for lookup and object creation
    private subjects: Subject<any>[] = [];
    public mappings: EventSubjectMap<any>[] = [];

    // the socket we are wrapping
    private socket: SocketTy | any; // trust that user passes in a socket-io conforming type??

    constructor(socket: SocketTy) {
        this.socket = socket;
    }

    public RegisterOnConnectObservable(): Observable<any> {
        // emits when a connect event occurs, informational only
        const newIndex: number = this.subjects.push(new Subject<any>()) - 1;
        this.mappings.push({ type: undefined, index: newIndex, eventName: "connect" });

        return this.subjects[newIndex].asObservable();
    }

    public RegisterEventObservable<PayloadTy>(eventName: string, type: { new (): PayloadTy }): Observable<PayloadTy> {
        const newIndex: number = this.subjects.push(new Subject<any>()) - 1;
        this.mappings.push({ type: new type(), index: newIndex, eventName: eventName } as EventSubjectMap<PayloadTy>);
        if (this.socket) {
            this.socket.on(eventName, payload => {
                //console.log(`Socket received event ${eventName}`);
                const mapping = this.mappings.find(m => m.eventName === eventName);
                // early out for special events
                if (eventName === "connect") {
                    // just emit nothing on the subject as connect is just a "it occured" event
                    this.subjects[mapping.index].next({});
                    return;
                } else if (eventName === "disconnect") {
                    this.subjects[mapping.index].next({});
                }

                // Check if this event is being tracked, if so, send this payload through
                // the transform-validate-emit flow
                // and leave

                if (mapping) {
                    this.TransformValidateEmitFlow(mapping, payload);
                } else {
                    console.log(`Got event ${eventName} for which no handler was installed.`);
                }
            });
        }

        return this.subjects[newIndex].asObservable();
    }

    public async TransformValidateEmitFlow(mapping: EventSubjectMap<any>, payload: any) {
        const transformedClass = plainToClassFromExist(mapping.type, payload);
        const errors = await validate(transformedClass);

        if (errors.length !== 0) {
            console.log("Found issues. Errors: ", errors);
            throw new Error("DISASTER");
        }

        this.subjects[mapping.index].next(transformedClass);
    }

    private async Transform(mapping: EventSubjectMap<any>, payload: any) {}

    private async Validate<T>(mapping: EventSubjectMap<any>, classInstance: T) {}

    private async Emit<T>(mapping: EventSubjectMap<any>, classInstance: T) {
        console.log("Emitting");
    }
}
