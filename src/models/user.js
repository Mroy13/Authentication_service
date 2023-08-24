'use strict';
const bcrypt = require('bcrypt');
const {ServerConfig}=require('../config')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      unique:true,
      validate:{
        isEmail:true
      },
      allowNull:false
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,15]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate( (user, options) => {
    const hashedPassword = bcrypt.hashSync(user.password, +ServerConfig.SALT_ROUNDS);
    user.password = hashedPassword;
  });
  return User;
};