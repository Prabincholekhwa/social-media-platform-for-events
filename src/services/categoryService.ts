import { categoryRepository } from '../database/repositories';
export const categoryService = {
  async find() {
    try {
      return await categoryRepository.find();
    } catch (err) {
      throw err;
    }
  },
};
