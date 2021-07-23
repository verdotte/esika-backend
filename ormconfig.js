/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const dotenv = require('dotenv');

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

const database =
  NODE_ENV === 'production' ? PROD_DB : NODE_ENV === 'test' ? TEST_DB : DEV_DB;

module.exports = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database,
  synchronize: NODE_ENV === 'production' ? false : true,
  logging: NODE_ENV === 'production' ? false : true,
  entities: [`${dir}/database/entity/**/*.{ts,js}`],
  migrations: [`${dir}/database/migrations/**/*.{ts,js}`],
  subscribers: [`${dir}/database/subscriber/**/*.{ts,js}`],
  seeds: [`${dir}/database/seeds/**/*.{ts,js}`],
  factories: [`${dir}/database/factories/**/*.{ts,js}`],
  cli: {
    migrationsDir: `${dir}/database/migrations`,
    entitiesDir: `${dir}/database/entity`,
    subscribersDir: `${dir}/database/subscriber`,
  },
};
