'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
      },
      phone: {
        type: Sequelize.STRING(10),
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'Activo', //Habra: Activo/Inactivo/Suspendido/Cancelacion
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
    await queryInterface.dropTable('Customers');
  }
};