const BaseError = require('./base.error');

class ServerError extends BaseError {
  constructor() {
    super(500, 'Server error');
  }
}

module.exports = ServerError;
