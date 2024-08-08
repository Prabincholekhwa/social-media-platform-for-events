import { WhereOptions } from 'sequelize';
import { InputFollowerInterface, FollowerInterface } from '../../interfaces';
import Model from '../models';
import { Id, PaginationField } from '../../schemas/common.schema';
import { calculatePagination } from '../../utils/helpers';

export const followerRepository = {
  async create({
    ...data
  }: InputFollowerInterface): Promise<FollowerInterface> {
    try {
      return await Model.Follower.create({ ...data });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async findOne({
    ...data
  }: InputFollowerInterface): Promise<FollowerInterface | null> {
    try {
      let where: WhereOptions = {};
      (where.hostId = data.hostId), (where.followerId = data.followerId);
      return await Model.Follower.findOne({ where });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async deleteOne({ ...data }: InputFollowerInterface): Promise<number> {
    try {
      let where: WhereOptions = {};
      (where.followerId = data.followerId), (where.hostId = data.hostId);
      return await Model.Follower.destroy({ where });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async find({ id, page, size }: Id & PaginationField) {
    try {
      const { limit, offset } = calculatePagination({ page, size });
      return await Model.Follower.findAndCountAll({
        where: {
          hostId: id,
        },
        include: [
          {
            model: Model.User,
            as: 'follower',
            attributes: ['id', 'name', 'profile'],
          },
        ],
        offset,
        limit,
        order: [['inserted', 'DESC']],
      });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },
};
