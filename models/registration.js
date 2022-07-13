'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     /* models.Registration.hasOne(models.Rate, {
        as: 'rates',
        /foreignKey: 'rateId',
      });*/
      models.Registration.belongsTo(models.Vehicle, {
        as: 'vehicles',
        foreignKey: 'vehicleId',
      });
      models.Registration.hasOne(models.Payment, {
        as: 'payments',
        foreignKey: 'registrationId'
      });
    }
  }
  Registration.init({
    vehicleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};