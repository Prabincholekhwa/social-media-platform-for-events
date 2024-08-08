import { CategoryInterface } from '../../interfaces';
import { Id } from '../../schemas/common.schema';
import Model from '../models';

export const categoryRepository = {
  async find(): Promise<{
    count: number;
    rows: CategoryInterface[];
  }> {
    try {
      return await Model.Category.findAndCountAll();
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async findByPk({ id }: Id): Promise<CategoryInterface | null> {
    try {
      return await Model.Category.findByPk(id);
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },
};
