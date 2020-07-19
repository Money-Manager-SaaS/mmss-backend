import * as express from 'express';
import * as services from './transService';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';
import { prepareAccounts, prepareLedger, prepareTransactionRelations } from '../../middleware/relationsMiddleware';



const router = express.Router();

handleBodyRequestParsing(router);
router.use(authenticateJWT);



router.get('/:ledgerID', prepareLedger, prepareTransactionRelations, prepareAccounts, services.getAll);
router.get('/:ledgerID/:entityID', prepareLedger, prepareAccounts, services.getOne);
router.post('/:ledgerID', prepareLedger, prepareTransactionRelations, services.createOne);
router.put('/:ledgerID/:entityID', prepareLedger, prepareTransactionRelations, prepareAccounts, services.updateOne);
router.delete('/:ledgerID/:entityID', prepareLedger, prepareTransactionRelations, prepareAccounts, services.deleteOne);


export default router;
