const bcrypt = require('bcrypt');

'use strict';
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
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El nombre del usuario, no puede quedar vacío.',
        },
        len: {
          args: [0,40],
          msg: 'El campo nombre solo accepta 40 caracteres.'
        },
        is: {
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo, solo accepta texto.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El email no puede quedar vacío',
        },
        isEmail:{
          args: true,
          msg: 'Se deve proporcionar un email valido',
        },
        len: {
          args: [0,50],
          msg: 'Email solo acepta 35, caracteres'
        }
      }
    },
    password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'La contrasena no puede quedar vacío',
      },
      len: {
        args: [0,8],
        msg: 'la contrasena debe contener 8 caracteres'
      },
      is: {
        args: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        msg: 'La contrasena debe conter al menos una letra mayuscula, una letra minuscula, numero y un caracter especial'
      }
    }
  },
    rol: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'el rol no puede quedar vacío',
        },
      }
    },
    active: DataTypes.BOOLEAN,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpire: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  
  return User;
};