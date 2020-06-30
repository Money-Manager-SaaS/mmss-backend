import express from "express";
import { applyMiddleware, applyRoutes } from "./utils/utils";
import middleware from "./middleware/index";
import errorHandlers from "./middleware/errorHandlers";
import CRUDRouters from "./services";
import authRouter from "./services/auth/router";

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

const app = express();

applyMiddleware(middleware, app);
applyRoutes(CRUDRouters, app);
app.use('/auth', authRouter);
applyMiddleware(errorHandlers, app);


const { PORT = 3000 } = process.env;
const server = app;

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);
