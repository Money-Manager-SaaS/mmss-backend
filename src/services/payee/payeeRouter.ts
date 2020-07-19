import * as express from 'express';
import * as services from './payeeService';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';
import { prepareLedger } from '../../middleware/relationsMiddleware';

const router = express.Router();

handleBodyRequestParsing(router);
router.use(authenticateJWT);


router.post('/:ledgerID', prepareLedger, services.createOne);
router.get('/:ledgerID', prepareLedger, services.getAll);
router.put('/:ledgerID/:entityID', prepareLedger, services.updateOne);
router.get('/:ledgerID/:entityID', prepareLedger, services.getOne);
router.delete('/:ledgerID/:entityID', prepareLedger, services.deleteOne);


export default router;
