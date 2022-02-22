import { Subject, Observable } from "rxjs";
import { EventSubjectMap, ClassType } from "./event-subject-map";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export abstract class MessageBroker {
    protected subjects: Subject<any>[] = [];
    protected mappings: EventSubjectMap<any>[] = [];

    // Registration point for user (Rx traffic)
    public abstract RegisterEventObservable<PayloadTy>(eventName: string, type?: ClassType<PayloadTy>): Observable<PayloadTy>;
    public abstract RegisterEventObservable<PayloadTy>(eventName: string, type: ClassType<PayloadTy>): Observable<PayloadTy>;

    protected async TransformValidateEmitFlow(mapping: EventSubjectMap<any>, payload: any) {
        const transformedClass = plainToClass(mapping.type, payload);
        const errors = await validate(transformedClass);
        if (errors.length !== 0) {
            throw new Error(JSON.stringify(errors, null, 2));
        }

        this.subjects[mapping.index].next(transformedClass);
    }

    protected EmitOnlyFlow(mapping: EventSubjectMap<any>) {
        this.subjects[mapping.index].next({});
    }

    protected RegisterMapping<PayloadTy>(eventName: string, type: ClassType<PayloadTy>, emitClass: boolean): Observable<PayloadTy> {
        const newIndex: number = this.subjects.push(new Subject<any>()) - 1;
        this.mappings.push({ type: type, index: newIndex, eventName: eventName, emitClass: emitClass });

        return this.subjects[newIndex].asObservable();
    }

    protected async HandleIncomingData(eventName: string, payload: any) {
        const mappings = this.mappings.filter((m) => m.eventName === eventName);
        for (let i = 0; i < mappings.length; ++i) {
            if (mappings[i].emitClass) {
                await this.TransformValidateEmitFlow(mappings[i], payload);
            } else {
                this.EmitOnlyFlow(mappings[i]);
            }
        }
    }
}
