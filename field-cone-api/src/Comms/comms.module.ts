import { Module } from "@nestjs/common";
import { CommsService } from "./comms.service";
import { TiltModule } from "../Tilt/tilt.module";
import { CommsController } from "./comms.controller";

@Module({
    providers: [CommsService],
    imports: [TiltModule],
    controllers: [CommsController],
})
export class CommsModule {}
