const router = require('express').Router();
const loginService = require('./login.service');
const { customError, catchError } = require('../../common/error');

router.route('/').post(
  catchError(async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
      throw new customError(400, 'Bad request');
    } else {
      const token = await loginService.authenticateUser(login, password);
      if (token) {
        res.status(200).send({ token });
      } else {
        throw new customError(403, 'Forbidden');
      }
    }
  })
);

module.exports = router;
