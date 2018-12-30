import { LogLevel } from "./log-levels";

/* 
    Format of incoming logs to the logging endpoint
*/

export class LogDto {
    constructor(private message: string, private level: LogLevel, private timeStamp: Date, private source: string) {}

    toString() {
        return `[${this.source} @ ${this.timeStamp
            .toISOString()
            .replace("T", " ")
            .replace("Z", "")}] [${LogLevel[this.level]}] - ${this.message}`;
    }
}
