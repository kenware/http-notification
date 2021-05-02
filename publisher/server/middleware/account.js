import Validator from 'validatorjs';
import bcrypt from 'bcryptjs';
import Handler from '../utils/handler';
import Models from '../models';

export default class Account {
  static async create(req, res, next) {
    const { email, password } = req.body;
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|min:8',
    };
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return Handler.errorHandler(req, res, validation.errors.errors, 400);
    }
    try {
      const account = await Models.Account.findOne({ where: { email } });
      if (account) {
        return Handler.errorHandler(req, res, 'Email already exist', 400);
      }
      const hash = bcrypt.hashSync(password, 8);
      req.hash = hash;
      return next();
    } catch (err) {
      return Handler.errorHandler(req, res, err.message || 'Error occured', 400);
    }
  }

  static async login(req, res, next) {
    const rules = {
      email: 'required|email',
      password: 'required',
    };
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return Handler.errorHandler(req, res, validation.errors.errors, 400);
    }
    return next();
  }
}
