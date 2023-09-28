const { BaseError } = require('sequelize');

class ServerError extends BaseError {
  constructor() {
    super(500, 'Server error');
  }
}

module.exports = ServerError;
