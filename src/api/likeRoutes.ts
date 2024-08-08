import { Router } from 'express';
import { likeController } from './controllers';
import validateUser from './middlewares/validateUser';
import ZOD from '../lib/zod';
import { Id } from '../schemas/common.schema';

export default function likeRoutes(router: Router) {
  router.post(
    '/likes/toggle/event/:id',
    validateUser(),
    ZOD.requestAsyncParser({
      schema: Id.strict(),
      type: 'Params',
    }),
    likeController.toggleLike
  );
}
