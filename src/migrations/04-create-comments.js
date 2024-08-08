'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100),
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      eventId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'events',
          key: 'id',
        },
        onDelete: 'SET NULL',
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
    await queryInterface.addIndex('comments', ['eventId'], {
      name: 'comments_eventId_index',
      concurrently: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('comments', 'comments_eventId_index');
    await queryInterface.dropTable('comments');
  },
};
