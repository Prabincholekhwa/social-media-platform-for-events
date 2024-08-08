'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('followers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(100),
      },
      hostId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      followerId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'users',
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

    await queryInterface.addIndex('followers', ['hostId', 'followerId'], {
      unique: true,
      name: 'followers_hostId_followerId_unique',
      concurrently: true,
    });

    await queryInterface.addIndex('followers', ['hostId'], {
      name: 'followers_hostId_index',
      concurrently: true,
    });
    await queryInterface.addIndex('followers', ['followerId'], {
      name: 'followers_followerId_index',
      concurrently: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      'followers',
      'followers_hostId_followerId_unique'
    );
    await queryInterface.removeIndex('followers', 'followers_hostId_index');
    await queryInterface.removeIndex('followers', 'followers_followerId_index');
    await queryInterface.dropTable('followers');
  },
};
