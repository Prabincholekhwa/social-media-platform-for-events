import { IncludeOptions } from 'sequelize';
import { CommentInterface, InputCommentInterface } from '../../interfaces';
import { Id, PaginationField } from '../../schemas/common.schema';
import { calculatePagination } from '../../utils/helpers';
import Model from '../models';

export const commentRepository = {
  async findByPk({ id }: Id): Promise<CommentInterface | null> {
    const include: IncludeOptions[] = [
      {
        model: Model.User,
        as: 'user',
        attributes: ['id', 'name', 'profile'],
      },
    ];
    try {
      return await Model.Comment.findByPk(id, { include });
    } catch (err) {
      throw err;
    }
  },
  async create({ ...data }: InputCommentInterface): Promise<CommentInterface> {
    try {
      return await Model.Comment.create({ ...data });
    } catch (err) {
      throw err;
    }
  },

  async update({
    id,
    ...data
  }: Omit<InputCommentInterface, 'userId' | 'eventId'> & Id) {
    try {
      return await Model.Comment.update(data, { where: { id } });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async deleteOne({ id }: Id): Promise<number> {
    try {
      return await Model.Comment.destroy({ where: { id } });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async findByEventId({ id, page, size }: Id & PaginationField): Promise<{
    rows: CommentInterface[];
    count: number;
  }> {
    try {
      const include: IncludeOptions[] = [
        {
          model: Model.User,
          as: 'user',
          attributes: ['id', 'name', 'profile'],
        },
      ];
      const { limit, offset } = calculatePagination({ page, size });
      return await Model.Comment.findAndCountAll({
        where: {
          eventId: id,
        },
        include,
        offset,
        limit,
        order: [['inserted', 'ASC']],
      });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },
};
