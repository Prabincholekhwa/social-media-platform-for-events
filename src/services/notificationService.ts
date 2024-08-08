import { notificationRepository } from '../database/repositories';
import { Id, PaginationField } from '../schemas/common.schema';
export const notificationService = {
  async find({ id, page, size }: Id & PaginationField) {
    try {
      return await notificationRepository.find({ id, page, size });
    } catch (err) {
      throw err;
    }
  },
};
