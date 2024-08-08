import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../../services';
import { formatResponseData } from '../../utils/helpers';

export const categoryController = {
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await categoryService.find();
      res
        .status(200)
        .json(
          formatResponseData(
            true,
            response,
            'Event Categories Fetched Successfully'
          )
        );
    } catch (err) {
      next(err);
    }
  },
};
