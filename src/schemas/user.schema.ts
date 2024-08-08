import { z } from 'zod';
import { emailField, passwordSchema, stringField } from './common.schema';

export const User = z.object({
  id: stringField('ID'),
  name: stringField('Name'),
  email: emailField('Email'),
  password: passwordSchema('Password'),
  profile: stringField('Profile'),
  inserted: stringField('Inserted'),
  updated: stringField('Updated'),
  accessToken: stringField('Access Token'),
});

export const UserInsert = User.omit({
  id: true,
  inserted: true,
  updated: true,
  profile: true,
  accessToken: true,
});

export const UserUpdate = User.omit({
  id: true,
  inserted: true,
  updated: true,
  accessToken: true,
  email: true,
  profile: true,
  password: true,
}).merge(
  z.object({
    profile: z.string().optional(),
  })
);

export const UserProfileImageUpdate = User.pick({
  profile: true,
});

export const UserLogin = User.pick({
  email: true,
  password: true,
});

export const UserChangePassword = z.object({
  oldPassword: passwordSchema('Old Password'),
  newPassword: passwordSchema('New Password'),
});

export const userId = z.object({
  userId: stringField('userId'),
});

export const UserId = User.pick({ id: true });

export const UserEmail = User.pick({
  email: true,
});

export type UserId = z.infer<typeof UserId>;
export type User = z.infer<typeof User>;
export type UserLogin = z.infer<typeof UserLogin>;
export type UserInsert = z.infer<typeof UserInsert>;
export type UserChangePassword = z.infer<typeof UserChangePassword>;
export type UserEmail = z.infer<typeof UserEmail>;
export type UserUpdate = z.infer<typeof UserUpdate>;
export type UserProfileImageUpdate = z.infer<typeof UserProfileImageUpdate>;
export type userId = z.infer<typeof userId>;
