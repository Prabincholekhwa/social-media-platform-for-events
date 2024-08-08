import { deleteImageFile } from '../api/middlewares/imageUploader';
import { categoryRepository, eventRepository } from '../database/repositories';
import { InputEventInterface, InputUserInterface } from '../interfaces';
import { Id } from '../schemas/common.schema';
import { FilterEvent } from '../schemas/event.schema';
import { removePrefix } from '../utils/helpers';
export const eventService = {
  async create({ ...data }: InputEventInterface) {
    try {
      const categoryDetails = await categoryRepository.findByPk({
        id: data.categoryId,
      });
      if (!categoryDetails) {
        deleteImageFile(removePrefix(data.image, '/public/image/'));
        throw new Error('Invalid Category Selected');
      }
      return await eventRepository.create({ ...data });
    } catch (err) {
      throw err;
    }
  },

  async update({ id, ...data }: Id & Partial<InputEventInterface>) {
    try {
      const eventExist = await eventRepository.findByPk({ id });
      if (!eventExist) throw new Error('Event Does Not Exist');
      if (data.userId && eventExist.userId !== data.userId) {
        if (data.image && eventExist && eventExist.image !== data.image)
          deleteImageFile(removePrefix(data.image, '/public/image/'));
        throw new Error('Unauthorized');
      }
      if (data.categoryId) {
        const categoryDetails = await categoryRepository.findByPk({
          id: data.categoryId,
        });
        if (!categoryDetails) throw new Error('Invalid Category Selected');
      }
      return await eventRepository.update({ id, ...data });
    } catch (err) {
      throw err;
    }
  },

  async deleteOne({ id, userId }: Id & { userId: string }) {
    try {
      const eventDetails = await eventRepository.findByPk({ id });
      if (!eventDetails) throw new Error('Invalid Event Selected');
      if (eventDetails.userId !== userId) throw new Error('Unauthorized');
      const isDeleted = await eventRepository.delete({ id });
      isDeleted &&
        deleteImageFile(removePrefix(eventDetails.image, '/public/image/'));
      return isDeleted;
    } catch (err) {
      throw err;
    }
  },

  async find({
    userId,
    includeUser,
    userIdCheckLike,
    page,
    size,
    ...data
  }: {
    userId?: string;
    userIdCheckLike: string;
    includeUser?: boolean;
  } & FilterEvent) {
    try {
      return await eventRepository.find({
        userId,
        categoryId: data.categoryId,
        fromDateTime: data.fromDateTime,
        includeUser,
        toDateTime: data.toDateTime,
        searchKeyword: data.searchKeyword,
        userIdCheckLike,
        page,
        size,
      });
    } catch (err) {
      throw err;
    }
  },
};
