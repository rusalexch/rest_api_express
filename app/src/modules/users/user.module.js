const controller = require('./user.controller');
const UserEntity = require('./user.model');
const { client } = require('../../core/database');
const UserService = require('./user.service');

const { model, ...validators } = UserEntity;
const { name, fields } = model;
const User = client.define(name, fields);
User.sync();

const userService = UserService(User);

async function bootstrap(app) {
  app.use('/users', controller(validators, userService));
}

module.exports = {
  userService, User, bootstrap, validators,
};
