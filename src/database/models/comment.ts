import * as Sequelize from 'sequelize';
import { database } from '../config/connection';
import { CommentModelInterface } from '../../interfaces';
import User from './user';
import Event from './event';

const sequelize = database.sequelize;

const Comment = sequelize.define<CommentModelInterface>(
  'comments',
  {
    id: {
      type: Sequelize.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
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
        fields: ['eventId'],
        name: 'comments_eventId_index',
        concurrently: true,
      },
    ],
  }
);

export default Comment;
