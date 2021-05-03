import Handler from '../utils/handler';
import Models from '../models';

export default class Topic {
  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
  static async create(req, res) {
    const { name } = req.body;
    try {
      if (!name) return Handler.errorHandler(req, res, 'Topic name is required', 400);
      const where = { name, accountId: req.decoded.id };
      const [topic, created] = await Models.Topic.findOrCreate({ where });
      if (!created) {
        const message = `Topic '${name}' already exist for this account`;
        return Handler.errorHandler(req, res, message, 400);
      }

      return Handler.successHandler(req, res, topic, 201);
    } catch (err) {
      return Handler.errorHandler(req, res, err.message, 400);
    }
  }

  /**
   * @param {object} ctx
   * @param {req} ctx.request
   * @param {res} ctx.response
   */
  static async fetch(req, res) {
    try {
      const data = { where: { id: req.decoded.id }, include: { model: Models.Topic, as: 'topics' } };

      const account = await Models.Account.findOne(data);
      const { topics } = account;
      return Handler.successHandler(req, res, topics, 200);
    } catch (err) {
      return Handler.errorHandler(req, res, err.message, 400);
    }
  }
}
