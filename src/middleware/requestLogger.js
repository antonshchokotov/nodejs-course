const logger = require('../common/logger');

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, body, query } = req;

  logger.log({
    timestamp,
    level: 'info',
    method,
    url,
    query,
    body
  });

  next();
};

module.exports = requestLogger;
