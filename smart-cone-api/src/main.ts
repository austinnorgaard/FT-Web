import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./App/app.module";
import { ValidationPipe } from "@nestjs/common";
import { environment } from "../../field-trainer/field-trainer/src/environments/environment";
import cors = require("cors");

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.use(cors());
    app.useGlobalPipes(new ValidationPipe());
    // tslint:disable-next-line:radix
    await app.listen(parseInt(environment.config.smartConeApiHttpPort));
}
// start
bootstrap();
