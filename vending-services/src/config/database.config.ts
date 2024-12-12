import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { entities } from '../database/entities';
import config from './common.config';


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      username: config.database.username,
      password: config.database.password,
      entities,
      synchronize: false,
      logging: false,
    };
  }
}
