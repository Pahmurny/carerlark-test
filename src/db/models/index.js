import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';

import { postgres } from '../../config';

const { Op } = Sequelize;
const basename = _basename(module.filename);
postgres.config.operatorsAliases = Op;

const db = {};
const sequelize = new Sequelize(
  postgres.database,
  postgres.username,
  postgres.password,
  postgres.config,
);

readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
