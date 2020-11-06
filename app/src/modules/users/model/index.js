const { DataTypes } = require('sequelize');

const usersEntity = {
  name: 'users',
  fields: {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
  }
}

module.exports = usersEntity;