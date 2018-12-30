import { Module, Global } from "@nestjs/common";
import { FileLogger } from "./file-logger";

@Global()
@Module({
    providers: [FileLogger],
    exports: [FileLogger],
})
export class LoggerModule {}
