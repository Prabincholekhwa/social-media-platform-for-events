import express, { Express } from 'express';
import cors from 'cors';
import helmet, { xssFilter } from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from '../utils/errorHandler';
import Logger from './winston';
import routes from '../api';
import path from 'path';

const buildExpressServer = (app: Express) => {
  app.use('/public', express.static(path.join(__dirname, '../../public')));
  app.use(xssFilter());
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(cookieParser());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  // API's
  routes(app);

  //Handle Error
  app.use(errorHandler());

  const PORT: string | number = process.env.PORT || 9000;
  app.listen(PORT, () => Logger.info(`Server Starting: ${PORT}`));
};

export default buildExpressServer;
