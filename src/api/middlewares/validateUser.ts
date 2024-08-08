import JWT from '../../lib/jwt';
import { UserPayload } from '../../types/global';
import { NextFunction, Request, Response } from 'express';
import { getSecretKey } from '../../utils/helpers';

export type ValidationOptions = {
  isVerified?: boolean;
  checkUserAgent?: boolean;
  secretType?: 'access' | 'refresh' | 'verification';
};

const validateUser =
  (opt?: {
    checkUserAgent?: boolean;
    secretKey: ValidationOptions['secretType'];
  }) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any> | void> => {
    opt = { checkUserAgent: true, secretKey: 'access', ...opt };
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token)
        return res.status(400).json({ error: 'Authorization Token Missing' });

      const decode = JWT.verify<UserPayload>(
        token,
        getSecretKey(opt.secretKey)
      );
      if (opt.checkUserAgent && decode.userAgent !== req.headers['user-agent'])
        throw new Error('Invalid Token');
      req.user = decode;
      next();
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  };

export default validateUser;
