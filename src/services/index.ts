import transRoutes from "./transaction/routes"
import accountRoutes from "./account/routes";
import categoryRoutes from "./category/routes";
import payeeRoutes from "./payee/routes";
import { Request, Response } from 'express';


export default [
  // ...searchRoutes,
  ...transRoutes,
  ...accountRoutes,
  ...categoryRoutes,
  ...payeeRoutes,

  {
    path: "/",
    method: "get",
    handler: [
      async ({query}: Request, res: Response) => {
        res.status(200).send({
          message: `please remember data will be deleted after deployment at demo`,
          endpoints: [
            '/api/v1/transactions',
            '/api/v1/accounts',
            '/api/v1/categories',
            '/api/v1/payees',
          ]
        });
      }
    ]
  }];
