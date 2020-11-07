const { DataTypes } = require('sequelize');
const validator = require('validator');

const usersEntity = {
  name: 'users',
  fields: {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
  },
};

function createValidator(entity) {
  if (!entity) {
    return { status: false, message: 'entity is required' };
  }
  const errors = [];
  const { email, username, password } = entity;

  if (!email) {
    errors.push('email is required');
  } else if (!validator.isEmail(email.toString())) {
    errors.push('invalid email');
  }
  if (!username) {
    errors.push('username is required');
  } else if (username.toString().length < 3) {
    errors.push('username mast be more than 3 characters');
  }
  if (!password) {
    errors.push('password is reqired');
  } else if (password.toString().length < 6) {
    errors.push('password mast be more than 6 characters');
  }
  if (errors.length) {
    return { status: false, message: errors };
  }
  return { status: true };
}

function updateValidator(entity) {
  if (!entity) {
    return { status: false, message: 'no fields to update' };
  }
  const errors = [];
  const { email, username, password } = entity;
  if (email && !validator.isEmail(email.toString())) {
    errors.push('invalid email');
  }
  if (username && username.toString().length < 3) {
    errors.push('username mast be more than 3 characters');
  }
  if (password && password.toString().length < 6) {
    errors.push('password mast be more than 6 characters');
  }
  if (errors.length) {
    return { status: false, message: errors };
  }
  return { status: true };
}

module.exports = {
  model: usersEntity,
  createValidator,
  updateValidator,
};
