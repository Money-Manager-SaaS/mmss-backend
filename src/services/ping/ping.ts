import * as express from 'express';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';

const router = express.Router();
handleBodyRequestParsing(router);

// this is used to make sure server is running
router.get('/', async (req,res)=>{
  res.status(200).json('echo');
});

export default router;
