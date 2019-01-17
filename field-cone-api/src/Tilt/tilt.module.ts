import { Module } from "@nestjs/common";
import { TiltService } from "./tilt.service";

@Module({
    providers: [TiltService],
})
export class TiltModule {}
