'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entry: {
        type: Sequelize.DATE
      },
      exit: {
        type: Sequelize.DATE
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Vehicles',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
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
    await queryInterface.dropTable('Registrations');
  }
};