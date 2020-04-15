import { BaseTimeSyncService } from "./base-time-sync.service";
import { Injectable } from "@nestjs/common";

import * as child_process from "child_process";

@Injectable()
export class TimeSyncService implements BaseTimeSyncService {
    SetTime(date: Date): void {
        console.log(`Setting local device time to: ${date.toString()}`);
        child_process.exec(`sudo date -s "${date.toString()}"`);
    }
}