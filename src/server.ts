import express from 'express';
import { applyMiddleware, applyRoutes } from './utils/utils';
import middleware from './middleware/index';
import errorHandlers from './middleware/errorHandlers';
import checkAuth from './middleware/auth';
import routes from './services';
import cookieParser from 'cookie-parser';
process.on('uncaughtException', (e) => {
  console.log(e);
  process.exit(1);
});
process.on('unhandledRejection', (e) => {
  console.log(e);
  process.exit(1);
});

const app = express();
app.use(cookieParser());
applyMiddleware(middleware, app);
applyRoutes(routes, app);
applyMiddleware(errorHandlers, app);
applyMiddleware(checkAuth, app);

const { PORT = 3000 } = process.env;
const server = app;

server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
