const { dbTestSettings, dbDevSettings, dbProdSettings } = require('../../config');

module.exports = {
  production: dbProdSettings,
  development: dbDevSettings,
  test: dbTestSettings,
};

