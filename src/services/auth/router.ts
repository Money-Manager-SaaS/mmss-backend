import * as express from 'express';
const router = express.Router();
import * as services from './service';
import * as parser from 'body-parser';

// middleware here

router.use(parser.urlencoded({extended: true}));
router.use(parser.json());

router.post('/signin', services.singIn);
router.post('/signup', services.singUp);

router.delete('/delete', services.deleteUser);

// todo move to app
router.get('/ping', async (req,res)=>{
  res.status(200).send('echo');
});

export default router;
