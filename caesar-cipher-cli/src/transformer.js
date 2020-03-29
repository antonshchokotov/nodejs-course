const stream = require('stream');
const { encrypt, decrypt } = require('./caesar-cipher');

class Transformer extends stream.Transform {
  constructor(action, shift) {
    super(action, shift);
    this._shift = shift;
    this._action = action;
  }

  _transform(data, encoding, callback) {
    const result =
      this._action === 'encode'
        ? encrypt(data.toString(), this._shift)
        : decrypt(data.toString(), this._shift);
    callback(null, result);
  }
}

module.exports = {
  Transformer
};
