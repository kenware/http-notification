import express from 'express';
import UserController from '../controller/account';
import UserMiddleware from '../middleware/account';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/create',
  UserMiddleware.create,
  UserController.create);

router.post('/login',
  UserMiddleware.login,
  UserController.login);

router.get('/details',
  Auth.Authenticate,
  UserController.accountDetails);

export default router;
