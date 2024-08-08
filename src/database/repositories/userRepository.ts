import { InputUserInterface, UserInterface } from '../../interfaces';
import Model from '../models';
import { Id } from '../../schemas/common.schema';
import { Sequelize } from 'sequelize';

export const userRepository = {
  async findByEmail({
    email,
    password,
  }: {
    email: string;
    password?: boolean;
  }): Promise<UserInterface | null> {
    try {
      const attributes = [
        'id',
        'email',
        'name',
        'profile',
        'inserted',
        'updated',
      ];
      password && attributes.push('password');
      const data = await Model.User.findOne({
        where: {
          email,
        },
        attributes,
      });
      return data;
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async findById({
    id,
    password,
    accessToken,
  }: Id & {
    password?: boolean;
    accessToken?: boolean;
  }): Promise<UserInterface | null> {
    try {
      let exclude: string[] = [];

      !password && exclude.push('password');
      !accessToken && exclude.push('accessToken');
      const data = await Model.User.findByPk(id, {
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM followers AS F
                WHERE F."hostId" = '${id}'
              )`),
              'totalFollower',
            ],
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM events AS E
                WHERE E."userId" = '${id}'
              )`),
              'totalEventPosted',
            ],
          ],
          exclude,
        },
      });
      return data;
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async insert({
    ...data
  }: Omit<
    InputUserInterface,
    'inserted' | 'updated' | 'profile' | 'accessToken'
  >): Promise<UserInterface> {
    return await Model.User.create({ ...data });
  },

  async update({
    id,
    ...data
  }: Id &
    Omit<Partial<InputUserInterface>, 'id' | 'inserted' | 'updated'>): Promise<
    [number]
  > {
    try {
      return await Model.User.update(data, { where: { id } });
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },

  async findByUserId({
    id,
    userIdCheckIsFollowing,
  }: Id & {
    userIdCheckIsFollowing: string;
  }): Promise<UserInterface | null> {
    try {
      let exclude: string[] = ['password', 'accessToken'];
      const data = await Model.User.findByPk(id, {
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM followers AS F
                WHERE F."hostId" = '${id}'
              )`),
              'totalFollower',
            ],
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM events AS E
                WHERE E."userId" = '${id}'
              )`),
              'totalEventPosted',
            ],
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM followers AS F
                WHERE F."hostId" = "users"."id" AND F."followerId" = '${userIdCheckIsFollowing}'
              )`),
              'isFollowing',
            ],
          ],
          exclude,
        },
      });
      return data;
    } catch (error: any) {
      error.level = 'Critical';
      throw error;
    }
  },
};
