import * as express from 'express';
import * as services from './service';
import { handleBodyRequestParsing } from '../../middleware/common';

const router = express.Router();

handleBodyRequestParsing(router);

router.post('/signin', services.singIn);
router.post('/signup', services.singUp);

router.delete('/delete', services.deleteUser);

// todo move to app
router.get('/ping', async (req,res)=>{
  res.status(200).send('echo');
});

export default router;
