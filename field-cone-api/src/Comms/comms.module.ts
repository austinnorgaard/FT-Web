import { Module } from "@nestjs/common";
import { CommsGateway } from "./comms-gateway";

@Module({
    providers: [CommsGateway],
    imports: [],
    controllers: [],
})
export class CommsModule {}
