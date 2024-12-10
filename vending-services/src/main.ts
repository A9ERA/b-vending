import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/common.config';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(config.server.apiPrefix.prefix, {
    exclude: config.server.apiPrefix.exclude,
  });
  await app.listen(config.server.port);
}
bootstrap();
