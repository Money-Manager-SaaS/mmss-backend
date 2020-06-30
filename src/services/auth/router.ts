import express from 'express';
const router = express.Router();
import * as services from './service';

// middleware here
router.get('/signin', services.singin);

export default router;
