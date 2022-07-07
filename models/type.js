'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Type.hasMany(models.Vehicle, {
        as: 'vehicles',
        foreignKey: 'typeVehicleId',
      });
      models.Type.belongsTo(models.Floor, {
        as: 'floor',
        foreignKey: 'floorId',
      });
    }
  }
  Type.init({
    typeVehicle:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:'El tipo de vehículo, no puede quedar vacío.',
        }
      }
    },
    floorId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};