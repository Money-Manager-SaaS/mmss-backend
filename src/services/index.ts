import * as express from 'express';
import ledgerRouter from './ledger/ledgerRouter';

const router = express.Router();
// middlewares are used on each router seperately

router.use('/ledger', ledgerRouter)

export default router;
