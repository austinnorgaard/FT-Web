import { Module } from "@nestjs/common";
import { CommsService } from "./comms.service";
import { TiltModule } from "../Tilt/tilt.module";

@Module({
    providers: [CommsService],
    imports: [TiltModule],
    controllers: [],
})
export class CommsModule {}
