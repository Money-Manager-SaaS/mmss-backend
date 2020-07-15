import * as express from 'express';
import * as services from './initService';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';
import { prepareAccounts, prepareLedger } from '../../middleware/relationsMiddleware';



const router = express.Router();

handleBodyRequestParsing(router);
router.use(authenticateJWT);

router.get('/:ledgerID', prepareLedger, prepareAccounts, services.getAll);


export default router;
