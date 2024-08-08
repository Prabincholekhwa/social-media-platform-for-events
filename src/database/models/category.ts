import * as Sequelize from 'sequelize';
import { database } from '../config/connection';
import { CategoryModelInterface } from '../../interfaces';
import Event from './event';

const sequelize = database.sequelize;

const Category = sequelize.define<CategoryModelInterface>('categories', {
  id: {
    type: Sequelize.STRING(100),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

export default Category;
