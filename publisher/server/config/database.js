require('dotenv').config();

const credential = process.env;
module.exports = {
  development: {
    username: credential.DB_USER,
    password: credential.DB_PASS,
    database: credential.DB_NAME,
    host: credential.DB_HOST,
    dialect: credential.DB_DIALECT,
  },
  test: {
    username: credential.DB_USER,
    password: credential.DB_PASS,
    database: credential.TEST_DB_NAME,
    host: credential.DB_HOST,
    dialect: credential.DB_DIALECT,
  },
  production: {
    username: credential.DB_USER,
    password: credential.DB_PASS,
    database: credential.DB_NAME,
    host: credential.DB_HOST,
    dialect: credential.DB_DIALECT,
  },
};
