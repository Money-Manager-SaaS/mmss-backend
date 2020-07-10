import * as pino from 'pino';

const logger = pino(
  {
    name: 'mm-log',
    level: process.env?.LOG_LEVEL ? process.env?.LOG_LEVEL : 'info',
  }
);

export default logger;
