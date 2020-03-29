const { pipeline } = require('stream');
const { options } = require('./src/options-validator');
const { readStream, transformStream, writeStream } = require('./src/streams');

pipeline(readStream, transformStream, writeStream, err => {
  if (err) {
    console.error(`${options.action} operation error`, err);
  } else {
    console.log(`${options.action} operation completed`);
  }
});
