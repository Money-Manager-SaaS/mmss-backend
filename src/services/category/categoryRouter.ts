import * as express from 'express';
import * as services from './categoryService';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';
import { getLedger } from '../../middleware/getLedgerMiddleware';

const router = express.Router();

handleBodyRequestParsing(router);
router.use(authenticateJWT);


router.post('/:ledgerID', getLedger, services.createOne);
router.get('/:ledgerID', getLedger, services.getAll);
router.put('/:ledgerID/:entityID', getLedger, services.updateOne);
router.get('/:ledgerID/:entityID', getLedger, services.getOne);
router.delete('/:ledgerID/:entityID', getLedger, services.deleteOne);


export default router;
