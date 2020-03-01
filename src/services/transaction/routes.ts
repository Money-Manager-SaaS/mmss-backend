import { Request, Response } from "express";
import { index } from "./controller";


export default [
    {
        path: "/api/v1/transactions",
        method: "get",
        handler: [
            async ({ query }: Request, res: Response) => {
                const result = await index();
                res.status(200).send(result);
            }
        ]
    }
];
