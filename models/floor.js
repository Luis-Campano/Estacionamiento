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
        foreignKey:'floorId',
      });
      /*
      models.Floor.HasOne(models.Rate, {
        as: 'rate',
        foreignKey:'rateId',
      });
      */
    }
  }
  Floor.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El nombre de la planat, no puede quedar vacío.',
        },
        len: {
          args: [0,60],
          msg: 'El campo nombre solo accepta 60 caracteres.'
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Floor',
  });
  return Floor;
};