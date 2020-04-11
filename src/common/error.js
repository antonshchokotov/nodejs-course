class customError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const catchError = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  customError,
  catchError
};
