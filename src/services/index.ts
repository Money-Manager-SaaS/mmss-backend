import * as express from 'express';
import ledgerRouter from './ledger/ledgerRouter';
import accountRouter from './account/accountRouter';
import categoryRouter from './category/categoryRouter';
import payeeRouter from './payee/payeeRouter';
import transRouter from './transaction/transRouter';
import initRouter from './init/initRouter';

const router = express.Router();
// middleware are used on each router seperately

router.use('/ledgers', ledgerRouter);
router.use('/accounts', accountRouter);
router.use('/categories', categoryRouter);
router.use('/payees', payeeRouter);
router.use('/transactions', transRouter);
router.use('/init', initRouter);

export default router;
