import * as pino from 'pino';

const logger = pino(
  {
    level: process.env?.LOG_LEVEL ? process.env?.LOG_LEVEL : 'info',
    prettyPrint: true
  }
);

export default logger;
