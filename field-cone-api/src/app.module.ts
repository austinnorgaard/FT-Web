import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommsModule } from "./Comms/comms.module";

@Module({
    imports: [CommsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
