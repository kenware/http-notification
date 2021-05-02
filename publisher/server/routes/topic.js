import express from 'express';
import TopicController from '../controller/topic';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/',
  Auth.Authenticate,
  TopicController.create);

router.get('/',
  Auth.Authenticate,
  TopicController.fetch);

export default router;
