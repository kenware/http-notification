import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config';

export default class Handler {
  static errorHandler(req, res, message, status) {
    return res.status(status || 400).json({
      message,
      status,
    });
  }

  static successHandler(req, res, data, status) {
    return res.status(status || 200).json(data);
  }

  static generateToken(user) {
    const token = jwt.sign({ id: user.id, email: user.email }, config.secrete);
    return token;
  }

  static generateAccessKey() {
    return crypto.randomBytes(20).toString('hex');
  }

  static isObject(data) {
    return data instanceof Object && data.constructor === Object;
  }

  static isUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))|' // OR ip (v4) address
    + 'localhost' // OR localhost
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
  }

  static getUrl(url) {
    if (config.env && config.env === 'local') {
      let newUrl = url.replace('localhost:5000', 'subscriber2:5000');
      newUrl = newUrl.replace('localhost:9000', 'subscriber1:9000');
      newUrl = newUrl.replace('127.0.0.1:5000', 'subscriber2:5000');
      newUrl = newUrl.replace('127.0.0.1:9000', 'subscriber1:9000');
      return newUrl;
    }
    return url;
  }
}
