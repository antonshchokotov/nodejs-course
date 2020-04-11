const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
const exit = process.exit;

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', (error, origin) => {
  logger.log({
    timestamp: new Date().toISOString(),
    level: 'error',
    error: `${error}`,
    origin,
    stack: error.stack
  });
  exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.log({
    timestamp: new Date().toISOString(),
    level: 'error',
    origin: 'unhandledRejection',
    reason: `${reason.message}`,
    promise: `${promise}`,
    stack: reason.stack
  });
  exit(1);
});
