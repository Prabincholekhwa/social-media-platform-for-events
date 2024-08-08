import * as Sequelize from 'sequelize';
import { ModelTimeStampExtend } from '.';

export interface InputCategoryInterface {
  name: string;
}

export interface CategoryInterface extends ModelTimeStampExtend {
  id: string;
  name: string;
}

export interface CategoryModelInterface
  extends Sequelize.Model<CategoryInterface, Partial<InputCategoryInterface>>,
    CategoryInterface {}
