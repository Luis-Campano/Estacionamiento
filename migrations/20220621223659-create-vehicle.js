'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lincesPlate: {
        type: Sequelize.STRING(7),
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      lastRegistration: {
        type: Sequelize.DATE
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Customers',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        defaultValue: null,
      },
      typeVehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Vehicles',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehicles');
  }
};