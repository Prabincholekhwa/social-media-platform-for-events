import { Request, Response, NextFunction } from 'express';
import { commentService } from '../../services';
import { formatResponseData } from '../../utils/helpers';
import { CommentInsert, CommentUpdate } from '../../schemas/comment.schema';
import { Id, PaginationField } from '../../schemas/common.schema';

export const commentController = {
  async create(
    req: Request<{}, {}, CommentInsert>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.user!;
    const { description, eventId } = req.body;
    try {
      const response = await commentService.create({
        userId: id,
        description,
        eventId,
      });
      res
        .status(200)
        .json(
          formatResponseData(true, response, 'Comment Posted Successfully')
        );
    } catch (err) {
      next(err);
    }
  },

  async update(
    req: Request<Id, {}, CommentUpdate>,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.user?.id!;
    const { description } = req.body;
    const { id } = req.params;
    try {
      const response = await commentService.update({
        userId,
        description,
        id,
      });
      res
        .status(200)
        .json(
          formatResponseData(true, response, 'Comment Updated Successfully')
        );
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request<Id, {}, {}>, res: Response, next: NextFunction) {
    const userId = req.user?.id!;
    const { id } = req.params;
    try {
      const response = await commentService.deleteOne({
        userId,
        id,
      });
      res
        .status(200)
        .json(
          formatResponseData(true, response, 'Comment Deleted Successfully')
        );
    } catch (err) {
      next(err);
    }
  },

  async findByEventId(
    req: Request<Id, {}, {}, PaginationField>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { page, size } = req.query;
    try {
      const response = await commentService.findByEventId({
        id,
        page,
        size,
      });
      res
        .status(200)
        .json(
          formatResponseData(true, response, 'Comments Fetched Successfully')
        );
    } catch (err) {
      next(err);
    }
  },
};
