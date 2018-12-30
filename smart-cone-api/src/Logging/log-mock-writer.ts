import { LogWriter } from "./log-writer";
import { LogDto } from "./log.dto";

export class LogMockWriter implements LogWriter {
    logs: LogDto[] = [];
    write(msg: LogDto) {
        this.logs.push(msg); // normally we write to disk here, but instead store it here
    }

    getLastWrittenlog(): LogDto {
        return this.logs[this.logs.length - 1];
    }
}
