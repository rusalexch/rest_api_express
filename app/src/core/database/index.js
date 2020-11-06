const { Sequelize } = require('sequelize');

const { 
  DB_HOST: host,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_NAME: database,
  DB_PORT: port
} = process.env;

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    dialect: 'postgres',
    port
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = connect;
