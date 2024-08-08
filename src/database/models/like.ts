import * as Sequelize from 'sequelize';
import { database } from '../config/connection';
import { LikeModelInterface } from '../../interfaces';
import User from './user';
import Event from './event';

const sequelize = database.sequelize;

const Like = sequelize.define<LikeModelInterface>(
  'likes',
  {
    id: {
      type: Sequelize.STRING(100),
      allowNull: false,
      primaryKey: true,
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
    eventId: {
      type: Sequelize.STRING(100),
      allowNull: true,
      references: {
        model: Event,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'eventId'],
        name: 'likes_userId_eventId_unique',
        concurrently: true,
      },
      {
        fields: ['userId'],
        name: 'likes_userId_index',
        concurrently: true,
      },
      {
        fields: ['eventId'],
        name: 'likes_eventId_index',
        concurrently: true,
      },
    ],
  }
);

export default Like;
