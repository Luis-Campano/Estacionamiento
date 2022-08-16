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
      models.Vehicle.belongsTo(models.Customer, {
        as: 'customers',
        foreignKey: 'customerId',
      });
      models.Vehicle.belongsTo(models.Type, {
        as: 'types',
        foreignKey: 'typeVehicleId',
      });
      models.Vehicle.hasMany(models.Registration, {
        as: 'registrations',
      });
    }
  }
  Vehicle.init({
    lincesPlate: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El número de placas, no puede quedar vacío.',
        },
        len: {
          args: [1,7],
          msg: 'El campo admite de 1 a 7 caracteres.'
        },
        is: {
          args: /^[0-9a-zA-Z]+$/,
          msg: 'No se aceptan caracteres especiales.'
        }
      }
    },
    brand: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'La marca del vehículo, no puede quedar vacío.',
        },
        len: {
          args: [1,13],
          msg: 'El campo admite de 1 a 12 caracteres.'
        },
        is: {
          args: /^[A-Za-z0-9\s]+$/g,
          msg: 'No se aceptan caracteres especiales.'
        }
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
    }
  },

  color: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg:'El color del vehículo, no puede quedar vacío.',
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
  customerId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        args: true,
        msg:'El ID del cliente, no puede quedar vacío.',
      },
      isNumeric:{
        args: true,
        msg: 'El campos ID cliente, solo acepta caracteres, numericos.',
      },
    }
  }, 
  typeVehicleId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        args: true,
        msg:'El ID del tipo de vehículo, no puede quedar vacío.',
      },
      isNumeric:{
        args: true,
        msg: 'El campos ID tipo de Vehículo, solo acepta caracteres, numericos.',
      },
    }
  } 
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};