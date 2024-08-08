import userService from '../../services/userService';
import { Request, Response, NextFunction } from 'express';
import { formatResponseData, removePrefix } from '../../utils/helpers';
import {
  UserInsert,
  UserChangePassword,
  UserId,
  UserUpdate,
} from '../../schemas/user.schema';
import { userRepository } from '../../database/repositories';
import { deleteImageFile } from '../middlewares/imageUploader';

const userController = {
  async create(
    req: Request<{}, {}, UserInsert>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, name, password } = req.body;
      const userAgent = req.headers['user-agent']!;

      await userService.create({
        email,
        name,
        password,
      });
      const loginResponse = await userService.login({
        email,
        password,
        userAgent,
      });
      res
        .status(200)
        .json(
          formatResponseData(
            true,
            loginResponse,
            'User Registered Successfully'
          )
        );
    } catch (error) {
      console.log('err', error);
      next(error);
    }
  },
  async login(
    req: Request<{}, {}, UserInsert>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent']!;
    try {
      const response = await userService.login({
        email,
        password,
        userAgent,
      });
      res.status(200).json(formatResponseData(true, response, 'Login success'));
    } catch (error) {
      next(error);
    }
  },

  async changePassword(
    req: Request<{}, {}, UserChangePassword>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { newPassword, oldPassword } = req.body;
    const { id } = req.user!;
    try {
      await userService.changePassword({
        id,
        newPassword,
        oldPassword,
      });
      res
        .status(200)
        .json(formatResponseData(true, undefined, 'Password changed'));
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user!;
    try {
      await userService.logout({ id });

      res
        .status(200)
        .json(formatResponseData(true, undefined, 'Logout success'));
    } catch (error) {
      next(error);
    }
  },

  async findByUserId(
    req: Request<UserId, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const userIdCheckIsFollowing = req.user?.id!;
    try {
      const response = await userService.findByUserId({
        id,
        userIdCheckIsFollowing,
      });

      res.status(200).json(formatResponseData(true, response, 'Users details'));
    } catch (error) {
      next(error);
    }
  },

  async update(
    req: Request<{}, {}, UserUpdate>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.body;
    const { id } = req.user!;
    try {
      const response = await userService.update({ id, name });
      response &&
        res
          .status(200)
          .json(formatResponseData(true, response, 'User Updated'));
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const file = req.file;
    const { id } = req.user!;
    try {
      if (!file) throw new Error('Profile Image is required!');
      const response = await userService.update({
        id,
        profile: `/public/image/${file.filename}`,
      });

      const prevData = await userRepository.findById({ id });

      if (response && prevData && prevData.profile) {
        deleteImageFile(removePrefix(prevData.profile, '/public/image/'));
      }

      response &&
        res
          .status(200)
          .json(
            formatResponseData(
              true,
              response,
              'Profile Picture Updated Successfully'
            )
          );
    } catch (err) {
      next(err);
    }
  },

  async getOwnProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const response = await userService.findById({ id });
      res
        .status(200)
        .json(
          formatResponseData(true, response, 'Profile Fethched Successfully')
        );
    } catch (error) {
      console.log(error, 'errs');
      next(error);
    }
  },
};

export default userController;
