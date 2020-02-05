import { Module } from "@nestjs/common";
import { CommsService } from "./comms.service";
import { TiltModule } from "../Tilt/tilt.module";
import { CommsController } from "./comms.controller";
import { WifiModule } from "../Wifi/wifi.module";

@Module({
    providers: [CommsService],
    imports: [TiltModule, WifiModule],
    controllers: [CommsController],
})
export class CommsModule {}
