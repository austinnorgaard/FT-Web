import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./App/app.module";
import { environment } from "../../field-trainer/field-trainer/src/environments/environment";
import cors = require("cors");
import { FileLogger } from "./Logging/file-logger";
import { ConstraintsInterceptor } from "./App/constraints.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, {
        logger: false,
    });
    app.useLogger(app.get(FileLogger));
    app.use(cors());
    //app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ConstraintsInterceptor());
    await app.listen(parseInt(environment.config.backendPort, 10));
}
// start
bootstrap();
