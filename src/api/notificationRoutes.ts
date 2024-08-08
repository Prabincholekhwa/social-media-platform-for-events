import { Router } from 'express';
import { notificationController } from './controllers';
import validateUser from './middlewares/validateUser';
import ZOD from '../lib/zod';
import { PaginationField } from '../schemas/common.schema';

export default function notificationRoutes(router: Router) {
  router.get(
    '/notifications',
    validateUser(),
    ZOD.requestAsyncParser({
      schema: PaginationField.strict(),
      type: 'Query',
    }),
    notificationController.find
  );
}
