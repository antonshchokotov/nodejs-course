const { program } = require('commander');
const fs = require('fs');

const exit = process.exit;

function optionsValidator() {
  // collect options
  program.storeOptionsAsProperties(false);
  program
    .option('-s, --shift <number>', 'shift')
    .option('-i, --input <file>', 'input file')
    .option('-o, --output <file>', 'output file')
    .option('-a, --action <type>', 'action encode/decode');
  program.parse(process.argv);
  const options = program.opts();

  // show collected options
  console.log(options, '\n');

  // check if options are provided and valid
  if (!options.shift || !options.action) {
    console.log('Error: required option (shift or action) is missed');
    exit(1);
  } else {
    if (isNaN(parseInt(options.shift, 10))) {
      console.error('Error: shift option should be a number');
      exit(1);
    }
    if (options.action !== 'encode' && options.action !== 'decode') {
      console.error('Error: action option should be encode or decode');
      exit(1);
    }
  }
  // eslint-disable-next-line no-sync
  if (options.output && !fs.existsSync(`${options.output}`)) {
    console.error('Error: output file does not exist');
    exit(1);
  }
  // eslint-disable-next-line no-sync
  if (options.input && !fs.existsSync(`${options.input}`)) {
    console.error('Error: input file does not exist');
    exit(1);
  }

  return options;
}

module.exports = { options: optionsValidator() };
