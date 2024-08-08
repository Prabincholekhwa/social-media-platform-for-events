import {
  InputNotificationInterface,
  NotificationInterface,
} from '../../interfaces';
import { Id, PaginationField } from '../../schemas/common.schema';
import { calculatePagination } from '../../utils/helpers';
import Model from '../models';

export const notificationRepository = {
  async create({
    ...data
  }: InputNotificationInterface): Promise<NotificationInterface> {
    try {
      return await Model.Notification.create({ ...data });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async find({ id, page, size }: Id & PaginationField): Promise<{
    count: number;
    rows: NotificationInterface[];
  }> {
    try {
      const { offset, limit } = calculatePagination({ page, size });
      return await Model.Notification.findAndCountAll({
        where: { userId: id },
        offset,
        limit,
      });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },
};
