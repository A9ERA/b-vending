import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/common.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(config.server.apiPrefix.prefix, {
    exclude: config.server.apiPrefix.exclude,
  });
  await app.listen(config.server.port);
}
bootstrap();
