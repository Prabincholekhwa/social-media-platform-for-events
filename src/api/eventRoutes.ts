import { Router } from 'express';
import { eventController } from './controllers';
import validateUser from './middlewares/validateUser';
import ZOD from '../lib/zod';
import {
  EventInsert,
  EventUpdate,
  FilterFeedEvent,
} from '../schemas/event.schema';
import { uploadFileMiddleware } from './middlewares/imageUploader';
import { Id } from '../schemas/common.schema';
import { userId } from '../schemas/user.schema';
import { FilterEvent, FilterUserEvent } from '../schemas/event.schema';

export default function eventRoutes(router: Router) {
  router
    .post(
      '/events',
      validateUser(),
      uploadFileMiddleware('image'),
      ZOD.requestAsyncParser({
        schema: EventInsert.strict(),
        type: 'Body',
      }),
      eventController.create
    )
    .put(
      '/events/:id',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: EventUpdate.strict(),
        type: 'Body',
      }),
      eventController.update
    )
    .patch(
      '/events/image/:id',
      validateUser(),
      uploadFileMiddleware('image'),
      eventController.updateImage
    )
    .delete(
      '/events/:id',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: Id.strict(),
        type: 'Params',
      }),
      eventController.deleteById
    )
    .get(
      '/events/own',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: FilterEvent.strict(),
        type: 'Query',
      }),
      eventController.findOwnEvents
    )
    .get(
      '/events',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: FilterUserEvent.strict(),
        type: 'Query',
      }),
      eventController.findEventsByUserId
    )
    .get(
      '/events/feeds',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: FilterFeedEvent.strict(),
        type: 'Query',
      }),
      eventController.findFeedEvents
    );
}
