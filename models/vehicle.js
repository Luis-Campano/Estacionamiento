'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'id',
        target_key: 'customerId',
      });
    }
  }
  Vehicle.init({
    plateNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El número de placas, no puede quedar vacío.',
        },
        len: {
          args: [8,12],
          msg: 'El campo admite de 8 a 12 caracteres.'
        },
        is: {
          isAlphanumeric: true, 
          msg: 'No se aceptan caracteres especiales.'
        },
        unique: true,
      }
    },
    model: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El nombre del modelo, no puede quedar vacío.',
        },
        len: {
          args: [0,30],
          msg: 'El campo solo admite 30 caracteres'
        },
        is: {
          isAlphanumeric: true, 
          msg: 'No se aceptan caracteres especiales.'
        },
    }
  },
  customerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};