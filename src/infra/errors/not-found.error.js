const BaseError = require('./base.error');

class NotFoundError extends BaseError {
  constructor() {
    super(404, 'Not found');
  }
}

module.exports = NotFoundError;
