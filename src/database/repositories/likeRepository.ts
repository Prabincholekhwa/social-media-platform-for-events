import { WhereOptions } from 'sequelize';
import { InputLikeInterface, LikeInterface } from '../../interfaces';
import Model from '../models';

export const likeRepository = {
  async create({ ...data }: InputLikeInterface): Promise<LikeInterface> {
    try {
      return await Model.Like.create({ ...data });
    } catch (err) {
      throw err;
    }
  },

  async findOne({
    ...data
  }: InputLikeInterface): Promise<LikeInterface | null> {
    try {
      let where: WhereOptions = {};
      (where.userId = data.userId), (where.eventId = data.eventId);
      return await Model.Like.findOne({ where });
    } catch (err) {
      throw err;
    }
  },

  async deleteOne({ ...data }: InputLikeInterface): Promise<number> {
    try {
      let where: WhereOptions = {};
      (where.userId = data.userId), (where.eventId = data.eventId);
      return await Model.Like.destroy({ where });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },
};
