'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100),
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable('users');
  },
};
