const fs = require('fs');
const { Transformer } = require('./transformer');
const { options } = require('./options-validator');

const exit = process.exit;

const readStream = options.input
  ? fs.createReadStream(`./${options.input}`).on('error', () => {
      console.error('Error: cannot read from input file');
      exit(1);
    })
  : process.stdin;

const transformStream = new Transformer(options.action, Number(options.shift));

const writeStream = options.output
  ? fs
      .createWriteStream(`./${options.output}`, { flags: 'a' })
      .on('error', () => {
        console.error('Error: cannot write to output file');
        exit(1);
      })
  : process.stdout;

module.exports = {
  readStream,
  transformStream,
  writeStream
};
