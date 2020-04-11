const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { customError, catchError } = require('../../common/error');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
    })
  )

  .post(
    catchError(async (req, res) => {
      const newUser = await usersService.addUser(req.body);
      if (newUser) {
        res.json(User.toResponse(newUser));
      } else {
        throw new customError(400, 'Bad request');
      }
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const user = await usersService.getUser(req.params.id);
      if (user) {
        res.json(User.toResponse(user));
      } else {
        throw new customError(404, 'User not found');
      }
    })
  )

  .put(
    catchError(async (req, res) => {
      const newUser = await usersService.updateUser({
        ...req.body,
        id: `${req.params.id}`
      });
      if (newUser) {
        res.json(User.toResponse(newUser));
      } else {
        throw new customError(400, 'Bad request');
      }
    })
  )

  .delete(
    catchError(async (req, res) => {
      if (await usersService.deleteUser(req.params.id)) {
        res.status(204).end();
      } else {
        throw new customError(404, 'User not found');
      }
    })
  );

module.exports = router;
