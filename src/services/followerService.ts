import { followerRepository, userRepository } from '../database/repositories';
import { InputFollowerInterface } from '../interfaces';
import { NotificationEnum, ToggleFollowEnum } from '../enums';
import { notificationRepository } from '../database/repositories/notificationRepository';
import { Id, PaginationField } from '../schemas/common.schema';
export const followService = {
  async toggleFollow({
    ...data
  }: InputFollowerInterface): Promise<ToggleFollowEnum> {
    try {
      if (data.hostId == data.followerId)
        throw new Error('You can not follow yourself!');
      const doesHostExist = await userRepository.findById({ id: data.hostId });
      if (!doesHostExist) throw new Error('Invalid Host Selected');
      const isFollowed = await followerRepository.findOne({ ...data });
      if (!isFollowed) {
        await followerRepository.create({ ...data });
        const followerDetails = await userRepository.findById({
          id: data.followerId,
        });

        const hostDetails = await userRepository.findById({ id: data.hostId });
        if (!followerDetails) throw new Error('Invalid Follower');
        if (!hostDetails) throw new Error('Invalid Host');
        await notificationRepository.create({
          title: `Someone followed you`,
          description: `${followerDetails.name} has followed you.`,
          userId: data.hostId,
          notificationType: NotificationEnum.follow,
        });
        return ToggleFollowEnum.follow;
      } else {
        await followerRepository.deleteOne({ ...data });
        return ToggleFollowEnum.unfollow;
      }
    } catch (err) {
      throw err;
    }
  },
  async findFollower({ id, page, size }: Id & PaginationField) {
    try {
      return await followerRepository.find({ id, page, size });
    } catch (err) {
      throw err;
    }
  },
};
