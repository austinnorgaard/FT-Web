import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

var cors = require("cors");

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.use(cors());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
// start
bootstrap();
