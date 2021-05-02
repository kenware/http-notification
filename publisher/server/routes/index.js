import express from 'express';
import userRouter from './account';
import pubSub from './pubsub';
import topic from './topic';

const router = express.Router();

router.use('/', pubSub);
router.use('/topic', topic);
router.use('/account', userRouter);
router.get('/health', (req, res) => res.status(200).json('server is up'));
export default router;
