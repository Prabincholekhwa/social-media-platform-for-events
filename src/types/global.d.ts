import { Env } from '../schemas/global.schema';

export type UserPayload = {
  id: string;
  email: string;
  userAgent: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
