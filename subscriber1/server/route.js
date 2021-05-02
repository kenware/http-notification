/* eslint-disable import/extensions */
import express from 'express';
import logger from './utils.js';

const router = express.Router();

router.post('/test1',
  (req, res) => {
    logger.info('New notification received on test1 with data: %o', req.body);
    return res.status(201).json(req.body);
  });

router.post('/test2',
  (req, res) => {
    logger.info('New notification received on test2 with data: %o', req.body);
    return res.status(201).json(req.body);
  });

export default router;
