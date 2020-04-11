const { customError } = require('../common/error');
const logger = require('../common/logger');

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    logger.log({
      timestamp: new Date().toISOString(),
      level: 'error',
      statusCode: err.statusCode,
      message: err.message,
      method: req.method,
      url: req.url,
      body: req.body
    });
    res.status(err.statusCode).json(err.message);
    return;
  }

  logger.log({
    timestamp: new Date().toISOString(),
    level: 'error',
    statusCode: 500,
    message: err.message,
    method: req.method,
    url: req.url,
    body: req.body
  });

  res.status(500).json('Internal Server Error');
};

module.exports = errorHandler;
