import { rateLimit } from 'express-rate-limit';

export default class ExpressRateLimit {
  static apiLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: process.env.NODE_ENV === 'development' ? Infinity : 1000,
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}
