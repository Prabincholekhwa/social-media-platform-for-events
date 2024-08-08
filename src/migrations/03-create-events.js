'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
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
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      image: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
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
      categoryId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'categories',
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
    await queryInterface.addIndex('events', ['userId'], {
      name: 'events_userId_index',
      concurrently: true,
    });
    await queryInterface.addIndex('events', ['categoryId'], {
      name: 'events_categoryId_index',
      concurrently: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('events', 'events_userId_index');
    await queryInterface.removeIndex('events', 'events_categoryId_index');
    await queryInterface.dropTable('events');
  },
};
