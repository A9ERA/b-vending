import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/common.config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(config.server.apiPrefix.prefix, {
    exclude: config.server.apiPrefix.exclude,
  });
  app.enableCors();
  app.use(bodyParser.json({limit: '50mb'}));
  await app.listen(config.server.port);
}
bootstrap();
