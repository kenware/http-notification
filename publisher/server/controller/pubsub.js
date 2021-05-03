import axios from 'axios';
import Handler from '../utils/handler';
import Models from '../models';

export default class PubSub {
  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
  static async subscription(req, res) {
    const { url } = req.body;
    const { topic } = req;

    try {
      const [sub, created] = await Models.Subscription.findOrCreate({
        where: {
          topicId: topic.id,
          url,
        },
      });
      if (!created) Handler.errorHandler(req, res, `This endpoint '${url}' has subscribed to this topic`, 400);
      return Handler.successHandler(req, res, { url: sub.url, topic: topic.name }, 201);
    } catch (err) {
      return Handler.errorHandler(req, res, err.message, 400);
    }
  }

  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
  static async publish(req, res) {
    const { topic } = req;
    const where = { topicId: topic.id };
    try {
      const subs = await Models.Subscription.findAll({ where });

      const requestData = { topic: topic.name, data: req.body };
      const allResponse = await Promise.all(
        subs.map(async (sub) => {
          const responseData = { url: sub.url, topic: topic.name };
          try {
            await axios.post(Handler.getUrl(sub.url), requestData);
            responseData.message = 'Success';
            responseData.status = 201;
          } catch (err) {
            responseData.message = err.response ? err.response.data || 'Failed' : err.message;
            responseData.status = err.response ? err.response.status : 400;
          }
          return responseData;
        }),
      );
      return Handler.successHandler(req, res, allResponse, 201);
    } catch (err) {
      return Handler.errorHandler(req, res, err.message, 400);
    }
  }
}
