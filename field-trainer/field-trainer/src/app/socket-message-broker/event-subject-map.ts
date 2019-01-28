export type ClassType<T> = new (...args: any[]) => T;
// Marries 3 things:
// 1. An index into the subject array
// 2. The name of an event
// 3. The type which is emitted from the event
export class EventSubjectMap<T> {
    index: number;
    eventName: string;
    type: ClassType<T>;
    emitClass: boolean; // if false, the user doesn't care about return values, just the emission itself
}
