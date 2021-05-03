import dotenv from 'dotenv';

dotenv.config();

const { env } = process;
export default {
  secrete: env.APP_SECRETE,
  dbUser: env.DB_USER,
  dbPassword: env.DB_PASS,
  dbName: env.DB_NAME,
  dbHost: env.DB_HOST,
  dbDialect: env.DB_DIALECT,
  env: env.ENV,
};
