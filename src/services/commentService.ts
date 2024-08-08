import {
  commentRepository,
  eventRepository,
  userRepository,
} from '../database/repositories';
import { notificationRepository } from '../database/repositories/notificationRepository';
import { NotificationEnum } from '../enums';
import { CommentInterface, InputCommentInterface } from '../interfaces';
import { Id, PaginationField } from '../schemas/common.schema';
export const commentService = {
  async create({ ...data }: InputCommentInterface): Promise<CommentInterface> {
    try {
      const eventDetails = await eventRepository.findByPk({
        id: data.eventId,
      });
      if (!eventDetails) throw new Error('Invalid Event Selected');
      const commenterDetails = await userRepository.findById({
        id: data.userId,
      });
      if (!commenterDetails) throw new Error('Invalid Commenter');
      const comment = await commentRepository.create({ ...data });
      if (eventDetails.userId !== comment.userId)
        await notificationRepository.create({
          title: `${commenterDetails.name} commented your event ${eventDetails.title}`,
          description: `${commenterDetails.name} has commented "${data.description}" on your event "${eventDetails.title}".`,
          userId: eventDetails.userId,
          eventId: eventDetails.id,
          notificationType: NotificationEnum.comment,
        });
      return comment;
    } catch (err) {
      throw err;
    }
  },

  async update({
    id,
    ...data
  }: Omit<InputCommentInterface, 'eventId'> &
    Id): Promise<CommentInterface | null> {
    try {
      const doesCommentBelongsToUser = await commentRepository.findByPk({ id });
      if (
        doesCommentBelongsToUser &&
        doesCommentBelongsToUser.userId !== data.userId
      )
        throw new Error('Unauthorized');
      await commentRepository.update({ id, ...data });
      return await commentRepository.findByPk({ id });
    } catch (err) {
      throw err;
    }
  },

  async deleteOne({
    id,
    ...data
  }: Id &
    Omit<InputCommentInterface, 'eventId' | 'description'>): Promise<number> {
    try {
      const doesCommentBelongsToUser = await commentRepository.findByPk({ id });
      if (
        doesCommentBelongsToUser &&
        doesCommentBelongsToUser.userId !== data.userId
      )
        throw new Error('Unauthorized');
      return await commentRepository.deleteOne({ id });
    } catch (err) {
      throw err;
    }
  },

  async findByEventId({ id, page, size }: Id & PaginationField) {
    try {
      return await commentRepository.findByEventId({ id, page, size });
    } catch (err) {
      throw err;
    }
  },
};
