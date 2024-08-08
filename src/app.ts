import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import buildExpressServer from './lib/express';
import ZOD from './lib/zod';
import { env } from './schemas/global.schema';
import Logger from './lib/winston';
import { database } from './database/config/connection';

async function main() {
  try {
    ZOD.parse(env, process.env);

    //! DB Connection
    Logger.info('Connecting to DB');
    await database.connection();
    // await database.sequelize.sync({ alter: true });

    const app: Express = express();
    buildExpressServer(app);
  } catch (error: any) {
    Logger.error(error.message);
  }
}

main();
