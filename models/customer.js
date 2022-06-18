'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
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
   
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El/Los apellido del usuario, no puede quedar vacío.',
        },
        len: {
          args: [0,40],
          msg: 'El campo apellido solo accepta 40 caracteres.'
        },
        is: {
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El apellido, solo accepta texto.'
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
          args: [0,35],
          msg: 'Email solo acepta 35, caracteres'
        }
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El teléfono no puede quedar vacío',
        },
        isNumeric:{
          args: true,
          msg: 'El teléfono solo acepta caracteres, numericos',
        },
        len: {
          args: [1,10],
          msg: 'Teléfono solo acepta 10, caracteres'
        },
        is:{
          args: /^[0-9]{3}[0-9]{7}$/,
          msg: 'No es un número teléfonico, valido',
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};