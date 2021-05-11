import * as express from 'express';
import authRouter from './auth';
import apiRouter from './api';
import apitodayRouter from './GetToday'
const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', apiRouter);
router.use('/apitoday', apitodayRouter)
export default router;