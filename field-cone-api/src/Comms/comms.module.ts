import { Module } from "@nestjs/common";
import { CommsService } from "./comms.service";
import { TiltModule } from "../Tilt/tilt.module";
import { CommsController } from "./comms.controller";
import { WifiModule } from "../Wifi/wifi.module";
import { BaseTimeSyncService } from "./base-time-sync.service";
import { IsTargetSystem } from "../utils/is-target-system";
import { TimeSyncService } from "./time-sync.service";
import { MockTimeSyncService } from "./mock-time-sync.service";

@Module({
    providers: [CommsService, {
        provide: BaseTimeSyncService,
        useClass: IsTargetSystem() ? TimeSyncService : MockTimeSyncService,
    }],
    imports: [TiltModule, WifiModule],
    controllers: [CommsController],
})
export class CommsModule {}
