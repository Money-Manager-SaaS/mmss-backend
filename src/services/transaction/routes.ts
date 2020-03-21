import { Request, Response } from "express";
import { index } from "./provider";
import * as services from './service';


export default [
    {
        path: "/api/v1/transactions",
        method: "get",
        handler: [services.index]
    },
    {
        path: "/api/v1/transactions/:id",
        method: "get",
        handler: [services.getOne]
    },
    {
        path: "/api/v1/transactions/:id",
        method: "put",
        handler: [services.update]
    }
];
