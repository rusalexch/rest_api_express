const { Sequelize } = require('sequelize');
const logger = require('../config/winston');

const {
  DB_HOST: host,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_NAME: database,
  DB_PORT: port,
} = process.env;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port,
  logging: process.env.NODE_ENV === 'test' ? false : (msg) => logger.info(msg),
});

sequelize.authenticate()
  .then(() => {
    logger.info('Connection with DATABASE has been established successfully.');
  })
  .catch(logger.error);

module.exports = { client: sequelize };
