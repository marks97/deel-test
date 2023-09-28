class BaseError extends Error {
  constructor(httpCode, message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
