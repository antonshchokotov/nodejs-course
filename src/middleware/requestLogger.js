const fs = require('fs');
const path = require('path');

let requestsCounter = 0;

module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, body } = req;
  const params = {};

  const userId = /^\/users\/([\w-]+)/.exec(url);
  if (userId) params['userId'] = userId[1];

  const boardId = /^\/boards\/([\w-]+)/.exec(url);
  if (boardId) params['boardId'] = boardId[1];

  const taskId = /^\/boards\/([\w-]+)\/tasks\/([\w-]+)/.exec(url);
  if (taskId) params['taskId'] = taskId[2];

  const logObject = {
    timestamp,
    method,
    url,
    body,
    params
  };

  const logEntry = `${JSON.stringify(logObject)}\n\n`;

  const pathToLogFile = path.join(__dirname, '../../logs/requests.log');
  const writeStream = fs.createWriteStream(pathToLogFile, { flags: 'a' });
  writeStream.write(logEntry);
  writeStream.end();

  if (++requestsCounter % 10 === 0) {
    console.log(
      '>>>> 10 new request have been logged to ./logs/requests.log\n'
    );
    if (requestsCounter % 50 === 0) {
      console.log(
        `>>>> Total number of logged requests in current process: ${requestsCounter}\n`
      );
    }
  }

  next();
};
