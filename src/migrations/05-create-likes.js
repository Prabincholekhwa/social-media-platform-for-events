'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100),
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

    await queryInterface.addIndex('likes', ['userId', 'eventId'], {
      unique: true,
      name: 'likes_userId_eventId_unique',
      concurrently: true,
    });
    await queryInterface.addIndex('likes', ['userId'], {
      name: 'likes_userId_index',
      concurrently: true,
    });
    await queryInterface.addIndex('likes', ['eventId'], {
      name: 'likes_eventId_index',
      concurrently: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('likes', 'likes_userId_eventId_unique');
    await queryInterface.removeIndex('likes', 'likes_userId_index');
    await queryInterface.removeIndex('likes', 'likes_eventId_index');
    await queryInterface.dropTable('likes');
  },
};
