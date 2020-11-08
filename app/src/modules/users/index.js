const controller = require('./user.controller');
const UserEntity = require('./user.model');
const { client } = require('../../core/database');

const { name, fields } = UserEntity.model;
const User = client.define(name, fields);
User.sync();

async function bootstrap(app) {
  app.use('/users', controller(User, UserEntity));
}

module.exports = { User, bootstrap };
