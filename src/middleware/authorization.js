const { customError, catchError } = require('../common/error');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const authorization = catchError((req, res, next) => {
  if (!req.headers.authorization) throw new customError(401, 'Unauthorized');

  const [type, token] = req.headers.authorization.split(' ');
  if (type !== 'Bearer') throw new customError(401, 'Unauthorized');

  jwt.verify(token, JWT_SECRET_KEY, err => {
    if (err) {
      throw new customError(401, 'Unauthorized');
    } else {
      return next();
    }
  });
});

module.exports = authorization;
