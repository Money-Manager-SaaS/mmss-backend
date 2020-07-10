import * as express from 'express';
import * as services from './accountService';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';
import { getLedger } from '../../middleware/getLedgerMiddleware';

const router = express.Router();

handleBodyRequestParsing(router);
router.use(authenticateJWT);
router.use(getLedger);

router.post('/:ledgerID', services.createOne);
router.get('/:ledgerID', services.getAll);
router.put('/:ledgerID/:accountID', services.updateOne);
router.get('/:ledgerID/:accountID', services.getOne);
router.delete('/:ledgerID/:accountID', services.deleteOne);

export default router;
