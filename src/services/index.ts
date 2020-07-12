import * as express from 'express';
import ledgerRouter from './ledger/ledgerRouter';
import accountRouter from './account/accountRouter';
import categoryRouter from './category/categoryRouter';

const router = express.Router();
// middlewares are used on each router seperately

router.use('/ledgers', ledgerRouter);
router.use('/accounts', accountRouter);
router.use('/categories', categoryRouter);

export default router;
