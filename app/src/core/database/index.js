const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433
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
