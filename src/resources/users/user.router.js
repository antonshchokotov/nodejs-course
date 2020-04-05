const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })

  .post(async (req, res) => {
    const newUser = await usersService.addUser(req.body);
    newUser
      ? res.json(User.toResponse(newUser))
      : res.status(400).send('Bad request');
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    user
      ? res.json(User.toResponse(user))
      : res.status(404).send('User not found');
  })

  .put(async (req, res) => {
    const newUser = await usersService.updateUser({
      ...req.body,
      id: `${req.params.id}`
    });
    newUser
      ? res.json(User.toResponse(newUser))
      : res.status(400).send('Bad request');
  })

  .delete(async (req, res) => {
    (await usersService.deleteUser(req.params.id))
      ? res.status(204).end()
      : res.status(404).send('User not found');
  });

module.exports = router;
