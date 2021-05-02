import express from 'express';
import PubSubController from '../controller/pubsub';
import PubSubMiddleware from '../middleware/pubsub';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/subscribe/:topic',
  Auth.Authenticate,
  PubSubMiddleware.validateTopic,
  PubSubMiddleware.subscription,
  PubSubController.subscription);

router.post('/publish/:topic',
  Auth.Authenticate,
  PubSubMiddleware.validateTopic,
  PubSubMiddleware.publish,
  PubSubController.publish);

export default router;
