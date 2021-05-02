import bcrypt from 'bcryptjs';
import Handler from '../utils/handler';
import Models from '../models';

export default class Account {
  static async create(req, res) {
    const { email, name } = req.body;
    try {
      const account = await Models.Account.create({
        email,
        name,
        password: req.hash,
      });
      const token = Handler.generateToken(account);
      const secreteKey = Handler.generateAccessKey();
      await Models.AccessKey.create({ secreteKey, accountId: account.id });

      return Handler.successHandler(req, res, { account, token, secreteKey }, 201);
    } catch (err) {
      return Handler.errorHandler(req, res, err.message, 400);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const message = 'Wrong username or password';
    try {
      const include = { model: Models.AccessKey, as: 'accessKeys' };
      const account = await Models.Account.findOne({ where: { email }, include });
      if (account && bcrypt.compareSync(password, account.password)) {
        const token = Handler.generateToken(account);
        return Handler.successHandler(req, res, { account, token }, 200);
      }
      return Handler.errorHandler(req, res, message, 400);
    } catch (err) {
      return Handler.errorHandler(req, res, err.message || message, 400);
    }
  }

  static async accountDetails(req, res) {
    try {
      const data = {
        where: { id: req.decoded.id },
        include: {
          model: Models.Topic,
          as: 'topics',
          include: [
            { model: Models.Subscription, as: 'subscribers' },

          ],
        },
      };

      const account = await Models.Account.findOne(data);
      return Handler.successHandler(req, res, account, 200);
    } catch (err) {
      return Handler.errorHandler(req, res, err.message, 400);
    }
  }
}
