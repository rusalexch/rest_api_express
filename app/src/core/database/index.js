const { Sequelize } = require('sequelize');

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
  logging: process.env.NODE_ENV === 'test' ? false : console.log(),
});

async function connect() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { connect, clien: sequelize };
