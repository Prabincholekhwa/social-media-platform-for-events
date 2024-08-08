import * as Sequelize from 'sequelize';
import { database } from '../config/connection';
import { FollowerModelInterface } from '../../interfaces';
import User from './user';

const sequelize = database.sequelize;

const Follower = sequelize.define<FollowerModelInterface>(
  'followers',
  {
    id: {
      type: Sequelize.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    hostId: {
      type: Sequelize.STRING(100),
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    followerId: {
      type: Sequelize.STRING(100),
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['hostId', 'followerId'],
        name: 'followers_hostId_followerId_unique',
        concurrently: true,
      },
      {
        fields: ['hostId'],
        name: 'followers_hostId_index',
        concurrently: true,
      },
      {
        fields: ['followerId'],
        name: 'followers_followerId_index',
        concurrently: true,
      },
    ],
  }
);

export default Follower;
