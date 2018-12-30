import { Module, NestModule } from "@nestjs/common";
import { LoggingController } from "./logging.controller";

@Module({
    components: [],
    controllers: [LoggingController],
    imports: [],
})
export class LoggingModule {}
