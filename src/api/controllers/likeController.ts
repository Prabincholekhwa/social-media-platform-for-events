import { Request, Response, NextFunction } from 'express';
import { likeService } from '../../services';
import { formatResponseData } from '../../utils/helpers';
import { Id } from '../../schemas/common.schema';

export const likeController = {
  async toggleLike(
    req: Request<Id, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const userId = req.user?.id!;
      const response = await likeService.toggleLike({ userId, eventId: id });
      res
        .status(200)
        .json(formatResponseData(true, response, 'Like Status Toggled'));
    } catch (err) {
      next(err);
    }
  },
};
