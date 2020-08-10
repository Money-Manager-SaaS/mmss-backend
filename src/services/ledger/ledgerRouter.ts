import * as express from 'express';
import * as services from './ledgerService';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';

const router = express.Router();

handleBodyRequestParsing(router);
router.use(authenticateJWT);

router.post('/', services.createOne);
router.get('/', services.getAll);
router.post('/default/', services.createDefault);
router.put('/:ledgerID', services.updateOne);
router.get('/:ledgerID', services.getOne);
router.delete('/:ledgerID', services.deleteOne);

export default router;
