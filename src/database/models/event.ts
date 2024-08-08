import * as Sequelize from 'sequelize';
import { database } from '../config/connection';
import { EventModelInterface } from '../../interfaces';
import User from './user';
import Category from './category';

const sequelize = database.sequelize;

const Event = sequelize.define<EventModelInterface>(
  'events',
  {
    id: {
      type: Sequelize.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    userId: {
      type: Sequelize.STRING(100),
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    categoryId: {
      type: Sequelize.STRING(100),
      allowNull: true,
      references: {
        model: Category,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    indexes: [
      {
        fields: ['userId'],
        name: 'events_userId_index',
        concurrently: true,
      },
      {
        fields: ['categoryId'],
        name: 'events_categoryId_index',
        concurrently: true,
      },
    ],
  }
);

export default Event;
