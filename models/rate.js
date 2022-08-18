'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*models.Rate.belongsTo(models.Floor,{
         as:'floor',
         foreignKey: 'floorId',
       });*/
      /*models.Rate.belongsTo(models.Registration,{
        as:'registrations',
        foreignKey: 'registrtionId',
      });*/
    }
  }
  Rate.init({
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El nombre de la tarifa, no puede quedar vacío.',
        },
        len: {
          args: [0, 60],
          msg: 'El campo tipo solo accepta 40 caracteres.'
        },
        is: {
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo, solo accepta texto.'
        }
      },
    },
    quota: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'La cuota no puede quedar vacío',
        },
      },
    },
    tolerance: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo tolerancia no puede quedar vacío',
        },
        isNumeric: {
          args: true,
          msg: 'El campo solo acepta caracteres, númericos',
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Rate',
  });
  return Rate;
};