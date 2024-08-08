import { Router } from 'express';
import { commentController } from './controllers';
import validateUser from './middlewares/validateUser';
import ZOD from '../lib/zod';
import { CommentInsert, CommentUpdate } from '../schemas/comment.schema';
import { Id, PaginationField } from '../schemas/common.schema';

export default function commentRoutes(router: Router) {
  router
    .post(
      '/comments',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: CommentInsert.strict(),
        type: 'Body',
      }),
      commentController.create
    )
    .put(
      '/comments/:id',
      validateUser(),
      ZOD.requestAsyncParser(
        {
          schema: CommentUpdate.strict(),
          type: 'Body',
        },
        {
          schema: Id.strict(),
          type: 'Params',
        }
      ),
      commentController.update
    )
    .delete(
      '/comments/:id',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: Id.strict(),
        type: 'Params',
      }),
      commentController.delete
    )
    .get(
      '/comments/event/:id',
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
      commentController.findByEventId
    );
}
