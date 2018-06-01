/* eslint-disable no-unused-vars */
import path from 'path';
import dotenv from 'dotenv-safe';

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    jwtSecret: requireProcessEnv('JWT_SECRET'),
  },
  test: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 9000,
    postgres: {
      database: process.env.DB_NAME_TEST,
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASS_TEST,
      config: {
        host: process.env.DB_HOST_TEST,
        dialect: 'postgres',
        logging: false,
      },
    },
  },
  development: {
    postgres: {
      database: process.env.DB_NAME_DEV,
      username: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV,
      config: {
        host: process.env.DB_HOST_DEV,
        dialect: 'postgres',
        logging: false,
      },
    },
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    postgres: {
      database: process.env.DB_NAME_PROD,
      username: process.env.DB_USER_PROD,
      password: process.env.DB_PASS_PROD,
      config: {
        host: process.env.DB_HOST_PROD,
        dialect: 'postgres',
        logging: false,
      },
    },
  },
};

const settings = Object.assign(config.all, config[config.all.env]);

export const dbTestSettings = {
  username: config.test.postgres.username,
  password: config.test.postgres.password,
  database: config.test.postgres.database,
  host: config.test.postgres.config.host,
  dialect: config.test.postgres.config.dialect,
};
export const dbDevSettings = {
  username: config.development.postgres.username,
  password: config.development.postgres.password,
  database: config.development.postgres.database,
  host: config.development.postgres.config.host,
  dialect: config.development.postgres.config.dialect,
};
export const dbProdSettings = {
  username: config.production.postgres.username,
  password: config.production.postgres.password,
  database: config.production.postgres.database,
  host: config.production.postgres.config.host,
  dialect: config.production.postgres.config.dialect,
};

settings.dbTestSettings = dbTestSettings;
settings.dbDevSettings = dbDevSettings;
settings.dbProdSettings = dbProdSettings;

module.exports = settings;
export default module.exports;
