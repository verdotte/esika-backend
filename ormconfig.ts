import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DEV_DB,
  PROD_DB,
  TEST_DB,
  NODE_ENV,
} = process.env;

const dir = NODE_ENV === 'production' ? 'build' : 'src';

const database = NODE_ENV === 'production'
  ? PROD_DB
  : NODE_ENV === 'development'
  ? DEV_DB
  : TEST_DB;
  
const config: ConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database,
  synchronize: NODE_ENV === 'production' ? false : true,
  logging: false,
  entities: [`${dir}/database/entity/**/*.{ts,js}`],
  migrations: [`${dir}/database/migrations/**/*.{ts,js}`],
  subscribers: [`${dir}/database/subscriber/**/*.{ts,js}`],
  cli: {
    migrationsDir: `${dir}/database/migrations`,
    entitiesDir: `${dir}/database/entity`,
    subscribersDir: `${dir}/database/subscriber`,
  },
};

export = config;
