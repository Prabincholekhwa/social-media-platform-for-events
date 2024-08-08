import * as Sequelize from 'sequelize';
import { database } from '../config/connection';
import { UserModelInterface } from '../../interfaces';
import Like from './like';
import Event from './event';
import Follower from './follower';

const sequelize = database.sequelize;

const User = sequelize.define<UserModelInterface>('users', {
  id: {
    type: Sequelize.STRING(100),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profile: {
    type: Sequelize.STRING(100),
    defaultValue: null,
  },
  accessToken: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: null,
  },
});

export default User;
