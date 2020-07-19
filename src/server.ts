import * as express from "express";
import { applyMiddleware } from "./utils/utils";
import coreMiddleware from "./middleware/index";
import errorHandlers from "./middleware/errorHandlers";
import crudRouter from "./services/index";
import authRouter from "./services/auth/router";
import "reflect-metadata";
import pingRouter from './services/ping/ping';
import { loggerMiddleware } from './middleware/logger';
import logger from './logger';
import { prepareConnection } from './db/ormManager';

process.on("uncaughtException", e => {
  logger.info(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  logger.info(e);
  process.exit(1);
});


// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
prepareConnection().then(async (connection) => {
  // create express app
  const app = express();
  app.use(loggerMiddleware);
  // cors and compression middleware
  applyMiddleware(coreMiddleware, app);

  const npm_version = process.env.npm_package_version;
  const version = npm_version ? npm_version.split('.')[0] : '1';
  logger.info('running api version', parseInt(version));

  app.use('/auth', authRouter);
  app.use('/ping', pingRouter);
  app.use(`/api/v${parseInt(version)}`, crudRouter);

  applyMiddleware(errorHandlers, app);
  const {PORT = 3000} = process.env;
  app.listen(PORT, () =>
    logger.info(`Server is running http://localhost:${PORT}...`)
  );
}).catch(error => console.error(`TypeORM connection error: `, error));




