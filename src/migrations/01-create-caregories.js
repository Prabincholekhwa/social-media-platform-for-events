'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100),
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      inserted: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  },
};
