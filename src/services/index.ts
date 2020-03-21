import searchRoutes from "./search/routes";
import transRoutes from "./transaction/routes"
import { Request, Response } from 'express';
import { index } from './transaction/provider';

export default [...searchRoutes, ...transRoutes, {
  path: "/",
  method: "get",
  handler: [
    async ({ query }: Request, res: Response) => {
      res.status(200).send({
        'message': 'thanks to use mmex, got to /api/v1/'
      });
    }
  ]
}];
