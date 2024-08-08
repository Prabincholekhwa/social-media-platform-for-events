import * as Sequelize from 'sequelize';
import { database } from '../config/connection';
import { NotificationModelInterface } from '../../interfaces';
import User from './user';
import Event from './event';
import { NotificationEnum } from '../../enums';

const sequelize = database.sequelize;

const Notification = sequelize.define<NotificationModelInterface>(
  'notifications',
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
      defaultValue: null,
      references: {
        model: Event,
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    notificationType: {
      type: Sequelize.ENUM(...Object.values(NotificationEnum)),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        fields: ['userId'],
        name: 'notifications_userId_index',
        concurrently: true,
      },
    ],
  }
);

export default Notification;
