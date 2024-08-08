import { Router } from 'express';
import { followController } from './controllers';
import validateUser from './middlewares/validateUser';
import ZOD from '../lib/zod';
import { Id, PaginationField } from '../schemas/common.schema';

export default function followRoutes(router: Router) {
  router
    .post(
      '/followers/toggle/host/:id',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: Id.strict(),
        type: 'Params',
      }),
      followController.toggleFollow
    )
    .get(
      '/followers/own',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: PaginationField.strict(),
        type: 'Query',
      }),
      followController.findOwnFollowers
    )
    .get(
      '/followers/user/:id',
      validateUser(),
      ZOD.requestAsyncParser(
        {
          schema: Id.strict(),
          type: 'Params',
        },
        {
          schema: PaginationField.strict(),
          type: 'Query',
        }
      ),
      followController.findUserFollowers
    );
}
