import * as express from 'express';
import * as services from './service';
import { handleBodyRequestParsing } from '../../middleware/common';
import { authenticateJWT } from '../../middleware/jwtAuthMiddleWare';

const router = express.Router();

handleBodyRequestParsing(router);

router.post('/signin', services.singIn);
router.post('/signup', services.singUp);

router.delete('/delete', services.deleteUser);
router.post('/refresh', services.refreshToken);

// todo remove this and the relative test
router.get('/hidden', authenticateJWT, async (req,res)=>{
  //@ts-ignore
  res.status(200).json(req.userID);
});

export default router;
