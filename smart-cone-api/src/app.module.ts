import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StatusController } from "./status.controller";

@Module({
    imports: [],
    controllers: [AppController, StatusController],
    components: []
})
export class ApplicationModule {}
