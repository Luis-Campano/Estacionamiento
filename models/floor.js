'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Floor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     models.Floor.hasMany(models.Type,{
        as:'types',
        //foreignKey:'floorId',
      });
      models.Floor.belongsTo(models.Rate, {
        as: 'rates',
        foreignKey:'rateId',
      });
    }
  }
  Floor.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El nombre de la planta, no puede quedar vacío.',
        },
        len: {
          args: [0,60],
          msg: 'El campo nombre solo accepta 60 caracteres.'
        },
      is: {
        args: /^[a-zA-Z]+$/,
        msg: 'El campo solo accepta texto.'
      }
      },
    },
    rateId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg:'El ID de la tarifa, no puede quedar vacío.',
        },
        isNumeric:{
          args: true,
          msg: 'El campo ID tarifa, solo acepta caracteres, numericos.',
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Floor',
  });
  return Floor;
};