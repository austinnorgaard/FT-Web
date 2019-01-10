import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from '../../field-trainer/field-trainer/src/environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });
  await app.listen(parseInt(environment.config.coneApiHttpPort, 10));
}
bootstrap();
