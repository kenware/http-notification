import Validator from 'validatorjs';
import Handler from '../utils/handler';
import Models from '../models';

export default class PubSub {
  static subscription(req, res, next) {
    const { url } = req.body;
    const { topic } = req.params;

    const rules = {
      topic: 'required|string',
    };

    const validation = new Validator({ url, topic }, rules);

    if (!Handler.isUrl(url) || validation.fails()) {
      const error = { url: ['Invalid url parameter'] };
      return Handler.errorHandler(req, res, { ...error, ...validation.errors.errors }, 400);
    }
    return next();
  }

  static async validateTopic(req, res, next) {
    const { topic } = req.params;
    try {
      const where = { accountId: req.decoded.id, name: topic };
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

  static publish(req, res, next) {
    if (Handler.isObject(req.body) && Object.keys(req.body).length > 0) {
      return next();
    }
    const message = 'Payload must be a javascript object and contain data';
    return Handler.errorHandler(req, res, message, 400);
  }
}