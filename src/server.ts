import * as express from "express";
import { applyMiddleware } from "./utils/utils";
import coreMiddleware from "./middleware/index";
import errorHandlers from "./middleware/errorHandlers";
import crudRouter from "./services/index";
import authRouter from "./services/auth/router";
import { createConnection } from 'typeorm';
import "reflect-metadata";
import pingRouter from './services/ping/ping';

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});


// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(connection => {

  // create express app
  const app = express();

  // cors and compression middleware
  applyMiddleware(coreMiddleware, app);

  app.use('/auth', authRouter);
  app.use('/ping', pingRouter);
  app.use(`/api/${process.env.npm_package_version}`, crudRouter);

  applyMiddleware(errorHandlers, app);
  const {PORT = 3000} = process.env;
  app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
  );
}).catch(error => console.log("TypeORM connection error: ", error));




