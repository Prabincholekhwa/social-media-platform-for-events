'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100),
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
        defaultValue: null,
        references: {
          model: 'events',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      notificationType: {
        type: DataTypes.ENUM('like', 'comment', 'follow'),
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
    await queryInterface.addIndex('notifications', ['userId'], {
      name: 'notifications_userId_index',
      concurrently: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      'notifications',
      'notifications_userId_index'
    );

    await queryInterface.dropTable('notifications');
  },
};
