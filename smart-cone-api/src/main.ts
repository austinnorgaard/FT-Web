import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./App/app.module";
import { ValidationPipe } from "@nestjs/common";
import { FT_CONFIG } from "../../field-trainer/field-trainer/global-config";

import cors = require("cors");

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.use(cors());
    app.useGlobalPipes(new ValidationPipe());
    // tslint:disable-next-line:radix
    await app.listen(parseInt(FT_CONFIG.smartConeApiHttpPort));
}
// start
bootstrap();
