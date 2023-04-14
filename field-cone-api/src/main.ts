import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { environment } from "../../field-trainer/field-trainer/src/environments/environment";
import { getFieldConeId } from "utils/environment-helper";
import { IsTargetSystem } from "utils/is-target-system";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: false,
    });
    var devIp = `127.0.0.${await getFieldConeId()}`;
    const port = parseInt(environment.config.coneApiHttpPort, 10) + await getFieldConeId();
    await app.listen(port, IsTargetSystem ? null : devIp);
}
bootstrap();
