const { createLogger, transports } = require('winston');
const path = require('path');

const errorsLog = path.join(__dirname, '../../logs/errors.log');
const infoLog = path.join(__dirname, '../../logs/info.log');

const logger = createLogger({
  transports: [
    new transports.File({
      level: 'error',
      filename: errorsLog
    }),
    new transports.File({
      level: 'info',
      filename: infoLog
    })
  ]
});

module.exports = logger;
