import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";
import { GeneralSocketApi } from "./general-socket-api";

import { DatabaseModule } from "./Database/database.module";

@Module({
    imports: [],
    controllers: [AppController, StatusController],
    components: [GeneralSocketApi],
    modules: [DatabaseModule]
})
export class ApplicationModule {}
