import 'dotenv/config'
import { DataSource } from 'typeorm';
import { entities } from 'src/database/entities';
import config from 'src/config/common.config';

const migrationDataSource: DataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    username: config.database.username,
    password: config.database.password,
    entities,
    migrationsTableName: 'Migrations',
    migrations: [
        './src/database/migration/migrations/*{.ts,.js}',
        ...(config.database.initMockData ? ['./src/database/migration/mock/*{.ts,.js}'] : []),
    ],
});

export default migrationDataSource;
