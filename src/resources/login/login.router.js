const router = require('express').Router();
const loginService = require('./login.service');
const { customError, catchError } = require('../../common/error');

router.route('/').post(
  catchError(async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) throw new customError(400, 'Bad request');

    const token = await loginService.authenticateUser(login, password);
    if (!token) throw new customError(403, 'Forbidden');
    res.status(200).send({ token });
  })
);

module.exports = router;
