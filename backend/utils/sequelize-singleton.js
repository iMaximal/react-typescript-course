require('dotenv').config();

const Sequelize = require('sequelize');

const self = module.exports;
let sequelize;

/**
 * Construct a singleton sequelize object to query the database
 *
 * @returns {object} - Sequelize object
 */
exports.initialize = () => {
  if (!sequelize) {
    const dbName = process.env.PGDATABASE;
    const dbUsername = process.env.PGUSER;
    const dbPassword = process.env.PGPASSWORD;
    const dbHost = process.env.PGHOST;
    const dbPort = process.env.PGPORT;
    return new Sequelize(dbName, dbUsername, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: 'postgres',
      logging: false,
    });
  }

  return sequelize;
};

module.exports = self.initialize();
