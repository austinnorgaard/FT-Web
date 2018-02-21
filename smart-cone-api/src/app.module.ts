import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";
import { GeneralSocketApi } from "./general-socket-api";

@Module({
    imports: [],
    controllers: [AppController, StatusController],
    components: [GeneralSocketApi]
})
export class ApplicationModule {}
