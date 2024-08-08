import { Express, Router } from 'express';
import ExpressRateLimit from '../lib/express-rate-limit';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import bodyParser from 'body-parser';
import eventRoutes from './eventRoutes';
import likeRoutes from './likeRoutes';
import commentRoutes from './commentRoutes';
import followRoutes from './followerRoute';
import notificationRoutes from './notificationRoutes';

export default function routes(app: Express) {
  const router = Router();
  userRoutes(router);
  categoryRoutes(router);
  eventRoutes(router);
  likeRoutes(router);
  commentRoutes(router);
  followRoutes(router);
  notificationRoutes(router);

  app.use('/', bodyParser.json(), ExpressRateLimit.apiLimiter(), router);
}
