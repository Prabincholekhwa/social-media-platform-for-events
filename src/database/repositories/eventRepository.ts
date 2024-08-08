import sequelize, { IncludeOptions, Sequelize, WhereOptions } from 'sequelize';
import { EventInterface, InputEventInterface } from '../../interfaces';
import { Id } from '../../schemas/common.schema';
import Model from '../models';
import { FilterEvent } from '../../schemas/event.schema';
import { Op } from 'sequelize';
import { calculatePagination } from '../../utils/helpers';

export const eventRepository = {
  async findByPk({ id }: Id): Promise<EventInterface | null> {
    try {
      return await Model.Event.findByPk(id);
    } catch (err) {
      throw err;
    }
  },
  async create({ ...data }: InputEventInterface): Promise<EventInterface> {
    try {
      return await Model.Event.create({ ...data });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },
  async update({
    id,
    ...data
  }: Id &
    Omit<
      Partial<InputEventInterface>,
      'userId'
    >): Promise<EventInterface | null> {
    try {
      await Model.Event.update(data, { where: { id } });
      return await Model.Event.findByPk(id);
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async delete({ id }: Id): Promise<number> {
    try {
      return await Model.Event.destroy({ where: { id } });
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
  } & FilterEvent): Promise<{
    count: number;
    rows: EventInterface[];
  }> {
    let where: WhereOptions = {};
    let include: IncludeOptions[] = [
      {
        model: Model.Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    ];
    try {
      includeUser &&
        include.push({
          model: Model.User,
          as: 'user',
          attributes: ['id', 'name', 'profile'],
        });
      userId && (where.userId = userId);
      data.categoryId && (where.categoryId = data.categoryId);

      if (data.fromDateTime || data.toDateTime) {
        where.time = {};
        if (data.fromDateTime) {
          where.time[sequelize.Op.gte] = new Date(data.fromDateTime);
        }
        if (data.toDateTime) {
          where.time[sequelize.Op.lte] = new Date(data.toDateTime);
        }
      }

      if (data.searchKeyword) {
        where[Op.or as any] = [
          { title: { [Op.like]: `%${data.searchKeyword}%` } },
          { location: { [Op.like]: `%${data.searchKeyword}%` } },
          { description: { [Op.like]: `%${data.searchKeyword}%` } },
          {
            '$category.name$': { [Op.like]: `%${data.searchKeyword}%` },
          },
        ];
      }

      const { limit, offset } = calculatePagination({ page, size });
      console.log('limit', limit, 'offset', offset);

      return await Model.Event.findAndCountAll({
        where,
        include,
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM likes AS L
                WHERE L."eventId" = "events"."id"
              )`),
              'totalLike',
            ],
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM comments AS C
                WHERE C."eventId" = "events"."id"
              )`),
              'totalComment',
            ],
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM likes AS L
                WHERE L."eventId" = "events"."id" AND L."userId" = '${userIdCheckLike}'
              )`),
              'isLiked',
            ],
          ],
        },
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
