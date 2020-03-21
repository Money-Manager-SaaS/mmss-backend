import transRoutes from "./transaction/routes"
import accountRoutes from "./account/routes";
import categoryRoutes from "./category/routes";
import { Request, Response } from 'express';


export default [
  // ...searchRoutes,
  ...transRoutes,
  ...accountRoutes,
  ...categoryRoutes,

  {
    path: "/",
    method: "get",
    handler: [
      async ({query}: Request, res: Response) => {
        res.status(200).send({
          'message': 'thanks to use mmex, got to /api/v1/'
        });
      }
    ]
  }];
