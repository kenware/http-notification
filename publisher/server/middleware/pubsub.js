import Validator from 'validatorjs';
import axios from 'axios';
import Handler from '../utils/handler';
import Models from '../models';

export default class PubSub {
  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   * @param {Function} next
   */
  static async subscription(req, res, next) {
    const { url } = req.body;

    if (!Handler.isUrl(url)) {
      const error = { url: ['Invalid url parameter'] };
      return Handler.errorHandler(req, res, error, 400);
    }
    // Initial handshake between publisher and subscriber during subscription
    try {
      await axios.post(Handler.getUrl(url), { ping: 'ok' });
    } catch (err) {
      return Handler.errorHandler(req, res, `The endpoint '${url}' is not reachable`, 400);
    }
    return next();
  }

  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   * @param {Function} next
   */
  static async validateTopic(req, res, next) {
    const { topicId } = req.params;

    const rules = {
      topicId: 'required|numeric',
    };
    const validation = new Validator({ topicId }, rules);
    if (validation.fails()) {
      return Handler.errorHandler(req, res, validation.errors.errors, 400);
    }

    try {
      const where = { accountId: req.decoded.id, id: topicId };
      const topicExist = await Models.Topic.findOne({ where });
      if (!topicExist) {
        const message = 'The specied topic does not exist in your account';
        return Handler.errorHandler(req, res, message, 400);
      }
      req.topic = topicExist;
      return next();
    } catch (err) {
      return Handler.errorHandler(req, res, err.message, 400);
    }
  }

  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   * @param {Function} next
   */
  static publish(req, res, next) {
    if (Handler.isObject(req.body) && Object.keys(req.body).length > 0) {
      return next();
    }
    const message = 'Payload must be a javascript object and contain data';
    return Handler.errorHandler(req, res, message, 400);
  }
}
