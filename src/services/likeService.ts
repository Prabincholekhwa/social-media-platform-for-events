import {
  eventRepository,
  likeRepository,
  userRepository,
} from '../database/repositories';
import { InputLikeInterface } from '../interfaces';
import { ToggleLikeEnum } from '../enums';
import { notificationRepository } from '../database/repositories/notificationRepository';
import { NotificationEnum } from '../enums';
export const likeService = {
  async toggleLike({ ...data }: InputLikeInterface): Promise<ToggleLikeEnum> {
    try {
      const isLiked = await likeRepository.findOne({ ...data });
      const likerDetails = await userRepository.findById({ id: data.userId });
      const eventDetail = await eventRepository.findByPk({ id: data.eventId });
      if (!likerDetails) throw Error('Invalid Liker(userId)');
      if (!eventDetail) throw Error('Invalid event(eventId)');
      if (!isLiked) {
        const resp = await likeRepository.create({ ...data });
        if (eventDetail.userId !== resp.userId)
          await notificationRepository.create({
            title: `${likerDetails.name} liked your event`,
            description: `${likerDetails.name} has liked your event ${eventDetail.title}.`,
            userId: eventDetail.userId,
            eventId: eventDetail.id,
            notificationType: NotificationEnum.like,
          });
        return ToggleLikeEnum.liked;
      } else {
        await likeRepository.deleteOne({ ...data });
        return ToggleLikeEnum.unliked;
      }
    } catch (err) {
      throw err;
    }
  },
};
