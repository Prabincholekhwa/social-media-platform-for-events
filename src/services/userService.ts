import {
  UserInsert,
  UserLogin,
  UserChangePassword,
  UserId,
  UserUpdate,
} from '../schemas/user.schema';
import { userRepository } from '../database/repositories';
import Bcrypt from '../lib/bcrypt';
import JWT from '../lib/jwt';
import { getSecretKey } from '../utils/helpers';
const userService = {
  async create({ name, email, password }: UserInsert) {
    try {
      const doesEmailExist = await userRepository.findByEmail({ email });
      if (doesEmailExist) throw new Error('Email address already used');
      const hash = await Bcrypt.hash(password, 10);

      const response = await userRepository.insert({
        name,
        email,
        password: hash,
      });

      return response ? true : false;
    } catch (e) {
      throw e;
    }
  },
  async login({
    email,
    password,
    userAgent,
  }: UserLogin & { userAgent: string }) {
    try {
      const user = await userRepository.findByEmail({
        email,
        password: true,
      });
      if (!user) throw new Error('Invalid Email');
      const isValid = await Bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Invalid Password');
      const token = JWT.sign({
        data: {
          id: user.id,
          email: user.email,
          userAgent,
        },
        secretKey: getSecretKey('access'),
      });

      await userRepository.update({
        id: user.id,
        accessToken: token,
      });

      const userDetails = await userRepository.findById({ id: user.id });
      return {
        token,
        user: userDetails,
      };
    } catch (e) {
      throw e;
    }
  },

  async changePassword({
    id,
    newPassword,
    oldPassword,
  }: UserChangePassword & {
    id: string;
  }) {
    try {
      const doesExist = await userRepository.findById({
        id,
        password: true,
      });
      if (!doesExist) throw new Error('User not found');
      const isValid = await Bcrypt.compare(oldPassword, doesExist.password);
      if (!isValid) throw new Error('Incorrect Old Password');

      if (oldPassword === newPassword)
        throw new Error('New Password cannot be same as old');

      const hash = await Bcrypt.hash(newPassword, 10);
      return await userRepository.update({
        id,
        password: hash,
      });
    } catch (error) {
      throw error;
    }
  },

  async logout({ id }: UserId) {
    try {
      const user = await userRepository.findById({
        id,
        accessToken: true,
      });

      if (!user || !user.id || !user.accessToken)
        throw new Error('User not found');

      const response = await userRepository.update({
        id: user.id,
        accessToken: null,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async findById({ id }: UserId) {
    try {
      const user = await userRepository.findById({
        id,
      });
      return user;
    } catch (error) {
      throw error;
    }
  },

  async findByUserId({
    id,
    userIdCheckIsFollowing,
  }: UserId & { userIdCheckIsFollowing: string }) {
    try {
      const user = await userRepository.findByUserId({
        id,
        userIdCheckIsFollowing,
      });
      return user;
    } catch (error) {
      throw error;
    }
  },

  async update({ id, ...data }: UserId & Partial<UserUpdate>) {
    try {
      await userRepository.update({ id, ...data });
      return await this.findById({ id });
    } catch (error) {
      throw error;
    }
  },
};
export default userService;
