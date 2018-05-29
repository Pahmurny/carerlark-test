/* eslint-disable no-unused-vars */
import path from 'path';

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe');
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
  });
}
/* MOVE DB SETTINGS TO ENV VARS */
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
    postgres: {
      database: 'testDb',
      username: 'postgres',
      password: 'postgres',
      config: {
        host: 'localhost',
        dialect: 'postgres',
      },
    },
  },
  development: {
    postgres: {
      database: 'testDb',
      username: 'postgres',
      password: 'postgres',
      config: {
        host: 'localhost',
        dialect: 'postgres',
      },
    },
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    postgres: {
      database: 'testDb',
      username: 'postgres',
      password: 'postgres',
      config: {
        host: 'localhost',
        dialect: 'postgres',
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
