import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../../services';
import { formatResponseData } from '../../utils/helpers';
import { PaginationField } from '../../schemas/common.schema';

export const notificationController = {
  async find(
    req: Request<{}, {}, {}, PaginationField>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user!;
      const { page, size } = req.query;
      const response = await notificationService.find({ id, page, size });
      res
        .status(200)
        .json(
          formatResponseData(
            true,
            response,
            'Notification Fetched Successfully'
          )
        );
    } catch (err) {
      next(err);
    }
  },
};
