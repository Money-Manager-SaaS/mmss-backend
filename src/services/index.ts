import transRoutes from "./transaction/routes"
import accountRoutes from "./account/routes";
import categoryRoutes from "./category/routes";
import userRoutes from "./user/routes";
import payeeRoutes from "./payee/routes";
import ledgerRoutes from "./ledger/routes";
import { Request, Response } from 'express';


export default [
  // ...searchRoutes,
  ...transRoutes,
  ...accountRoutes,
  ...categoryRoutes,
  ...userRoutes,
  ...payeeRoutes,
  ...ledgerRoutes,

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
            '/api/v1/users',
            '/api/v1/payees',
            '/api/v1/ledgers',
          ]
        });
      }
    ]
  }];
