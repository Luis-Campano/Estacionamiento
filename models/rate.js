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
    type: DataTypes.STRING,
    quota: DataTypes.FLOAT,
    tolerance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rate',
  });
  return Rate;
};