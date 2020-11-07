const controller = require('./user.controller');
const UserEntity = require('./user.model');

async function bootstrap(dbClient, app) {
  const { name, fields } = UserEntity.model;
  const User = dbClient.define(name, fields);

  User.sync();
  app.use('/users', controller(User, UserEntity));
}

module.exports = bootstrap;
