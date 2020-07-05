import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";

export const handleAPIDocs = (router: Router) =>
    router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
