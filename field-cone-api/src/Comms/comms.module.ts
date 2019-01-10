import { Module } from "@nestjs/common";
import { CommsService } from "./comms.service";

@Module({
    providers: [CommsService],
    imports: [],
    controllers: [],
})
export class CommsModule {}
