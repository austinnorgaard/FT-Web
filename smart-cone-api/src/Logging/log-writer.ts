import { LogDto } from "./log.dto";

export interface LogWriter {
    write(log: LogDto);
}
