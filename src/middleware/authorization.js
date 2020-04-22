const { customError, catchError } = require('../common/error');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const authorization = catchError((req, res, next) => {
  if (!req.headers.authorization) throw new customError(401, 'Unauthorized');
  const isTypeBearer = req.headers.authorization.slice(0, 6) === 'Bearer';
  if (!isTypeBearer) throw new customError(401, 'Unauthorized');

  const token = req.headers.authorization.slice(7);

  jwt.verify(token, JWT_SECRET_KEY, err => {
    if (err) {
      throw new customError(401, 'Unauthorized');
    } else {
      return next();
    }
  });
});

module.exports = authorization;
