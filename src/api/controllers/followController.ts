import { Request, Response, NextFunction } from 'express';
import { followService } from '../../services';
import { formatResponseData } from '../../utils/helpers';
import { Id, PaginationField } from '../../schemas/common.schema';

export const followController = {
  async toggleFollow(
    req: Request<Id, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const userId = req.user?.id!;
      const response = await followService.toggleFollow({
        hostId: id,
        followerId: userId,
      });
      res
        .status(200)
        .json(formatResponseData(true, response, 'Follow Status Toggled'));
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async findOwnFollowers(
    req: Request<{}, {}, {}, PaginationField>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user!;
      const { page, size } = req.query;
      const response = await followService.findFollower({
        id,
        page,
        size,
      });
      res
        .status(200)
        .json(formatResponseData(true, response, 'Followers Fetched'));
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async findUserFollowers(
    req: Request<Id, {}, {}, PaginationField>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { page, size } = req.query;
      const response = await followService.findFollower({
        id,
        page,
        size,
      });
      res
        .status(200)
        .json(formatResponseData(true, response, 'Followers Fetched'));
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
