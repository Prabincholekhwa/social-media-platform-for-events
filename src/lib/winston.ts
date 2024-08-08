import { createLogger } from 'winston';
import winston from 'winston';
import path from 'path';

const Logger: winston.Logger = createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/server.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default Logger;
