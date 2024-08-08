import { Router } from 'express';
import ZOD from '../lib/zod';
import {
  UserLogin,
  UserId,
  UserInsert,
  UserChangePassword,
  UserUpdate,
} from '../schemas/user.schema';
import userController from './controllers/userController';
import validateUser from './middlewares/validateUser';
import { uploadFileMiddleware } from './middlewares/imageUploader';

export default function userRoutes(router: Router) {
  router
    .post(
      '/users',
      ZOD.requestAsyncParser({
        schema: UserInsert.strict(),
        type: 'Body',
      }),
      userController.create
    )
    .patch(
      '/users',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: UserUpdate.strict(),
        type: 'Body',
      }),
      userController.update
    )
    .get('/users/profile', validateUser(), userController.getOwnProfile)
    .patch(
      '/users/profile-image',
      validateUser(),
      uploadFileMiddleware('profile'),
      userController.updateProfile
    )
    .post(
      '/users/login',
      ZOD.requestAsyncParser({ schema: UserLogin.strict(), type: 'Body' }),
      userController.login
    )
    .patch(
      '/users/change-password',
      validateUser(),
      ZOD.requestAsyncParser({
        schema: UserChangePassword.strict(),
        type: 'Body',
      }),
      userController.changePassword
    )
    .get('/users/logout', validateUser(), userController.logout)
    .get(
      '/users/:id',
      validateUser(),
      ZOD.requestAsyncParser({
        type: 'Params',
        schema: UserId.strict(),
      }),
      userController.findByUserId
    );
}
