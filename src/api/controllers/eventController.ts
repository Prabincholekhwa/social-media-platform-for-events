import { Request, Response, NextFunction } from 'express';
import { eventService } from '../../services';
import { formatResponseData, removePrefix } from '../../utils/helpers';
import {
  EventInsert,
  EventUpdate,
  FilterEvent,
  FilterFeedEvent,
  FilterUserEvent,
} from '../../schemas/event.schema';
import { deleteImageFile } from '../middlewares/imageUploader';
import { Id } from '../../schemas/common.schema';
import { eventRepository } from '../../database/repositories';

export const eventController = {
  async create(
    req: Request<{}, {}, EventInsert>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) throw new Error('Event image is required!');
      const { categoryId, description, location, time, title } = req.body;
      const { id } = req.user!;
      const response = await eventService.create({
        categoryId,
        description,
        location,
        title,
        time,
        userId: id,
        image: `/public/image/${req.file.filename}`,
      });
      res
        .status(200)
        .json(
          formatResponseData(true, response, 'Event Created  Successfully')
        );
    } catch (err) {
      next(err);
    }
  },

  async update(
    req: Request<Id, {}, EventUpdate>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { categoryId, description, location, time, title } = req.body;
    const userId = req.user?.id!;
    try {
      const response = await eventService.update({
        id,
        categoryId,
        description,
        location,
        time,
        title,
        userId,
      });
      res
        .status(200)
        .json(
          formatResponseData(true, response, 'Event Updated  Successfully')
        );
    } catch (err) {
      next(err);
    }
  },

  async updateImage(
    req: Request<Id, {}, EventInsert>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const userId = req.user?.id!;
    try {
      if (!req.file) throw new Error('Event image is required!');

      const prevData = await eventRepository.findByPk({ id });

      const response = await eventService.update({
        id,
        image: `/public/image/${req.file.filename}`,
        userId,
      });
      if (response && prevData) {
        deleteImageFile(removePrefix(prevData.image, '/public/image/'));
      }
      res
        .status(200)
        .json(
          formatResponseData(
            true,
            response,
            'Event Image Updated  Successfully'
          )
        );
    } catch (err) {
      next(err);
    }
  },

  async deleteById(
    req: Request<Id, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const userId = req.user?.id!;
    try {
      const isDeleted = await eventService.deleteOne({ id, userId });
      isDeleted &&
        res
          .status(200)
          .json(
            formatResponseData(true, isDeleted, 'Event Deleted  Successfully')
          );
    } catch (err) {
      next(err);
    }
  },

  async findOwnEvents(
    req: Request<{}, {}, {}, FilterEvent>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user!;
      const {
        categoryId,
        fromDateTime,
        searchKeyword,
        toDateTime,
        page,
        size,
      } = req.query;
      const response = await eventService.find({
        userId: id,
        categoryId,
        fromDateTime,
        toDateTime,
        searchKeyword,
        userIdCheckLike: id,
        includeUser: true,
        page,
        size,
      });
      res
        .status(200)
        .json(
          formatResponseData(
            true,
            response,
            'Your Events Fetched  Successfully'
          )
        );
    } catch (err) {
      throw err;
    }
  },

  async findEventsByUserId(
    req: Request<{}, {}, {}, FilterUserEvent>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        userId,
        categoryId,
        fromDateTime,
        searchKeyword,
        toDateTime,
        page,
        size,
      } = req.query;
      const { id } = req.user!;
      const response = await eventService.find({
        userId,
        includeUser: true,
        categoryId,
        fromDateTime,
        searchKeyword,
        toDateTime,
        userIdCheckLike: id,
        size,
        page,
      });
      res
        .status(200)
        .json(
          formatResponseData(true, response, ' Events Fetched  Successfully')
        );
    } catch (err) {
      throw err;
    }
  },

  async findFeedEvents(
    req: Request<{}, {}, {}, FilterFeedEvent>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        categoryId,
        fromDateTime,
        searchKeyword,
        toDateTime,
        page,
        size,
      } = req.query;
      const { id } = req.user!;
      const response = await eventService.find({
        includeUser: true,
        categoryId,
        fromDateTime,
        searchKeyword,
        toDateTime,
        userIdCheckLike: id,
        page,
        size,
      });
      res
        .status(200)
        .json(
          formatResponseData(
            true,
            response,
            'Feed Events Fetched  Successfully'
          )
        );
    } catch (err) {
      throw err;
    }
  },
};
