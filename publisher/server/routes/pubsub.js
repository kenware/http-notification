import express from 'express';
import PubSubController from '../controller/pubsub';
import PubSubMiddleware from '../middleware/pubsub';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/subscribe/:topicId',
  Auth.Authenticate,
  PubSubMiddleware.validateTopic,
  PubSubMiddleware.subscription,
  PubSubController.subscription);

router.post('/publish/:topicId',
  Auth.Authenticate,
  PubSubMiddleware.validateTopic,
  PubSubMiddleware.publish,
  PubSubController.publish);

export default router;
