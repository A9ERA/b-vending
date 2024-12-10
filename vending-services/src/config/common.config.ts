import { RequestMethod } from '@nestjs/common';
import 'dotenv/config';

const { env } = process;

const config = {
  server: {
    port: env.PORT ?? 4000,
    apiPrefix: {
      prefix: '/api/v1',
      exclude: [
        {
          path: 'health-check',
          method: RequestMethod.GET,
        },
      ],
    },
  },
  database: {
    host: env.DATABASE_ENDPOINT,
    port: +env.DATABASE_PORT,
    name: env.DATABASE_NAME,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    enableLog: !!env.DB_LOG,
  }
};
export default config;
