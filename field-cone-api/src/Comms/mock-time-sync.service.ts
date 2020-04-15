import { BaseTimeSyncService } from "./base-time-sync.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MockTimeSyncService implements BaseTimeSyncService {
    SetTime(date: Date): void {
        console.log(`Wouldve set the current date/time to: ${date.toString()}`);
    }
}