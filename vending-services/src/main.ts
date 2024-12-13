import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/common.config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(config.server.apiPrefix.prefix, {
    exclude: config.server.apiPrefix.exclude,
  });
  app.enableCors();
  app.use(bodyParser.json({limit: '50mb'}));

  const docConfig = new DocumentBuilder()
    .setTitle('Blue Vending API')
    .setDescription('The Blue Vending API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(config.server.port);
}
bootstrap();
