const router = require('express').Router();
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');

router.use(
  '/:id/tasks/',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const newBoard = await boardsService.addBoard(req.body);
    newBoard ? res.json(newBoard) : res.status(400).send('Bad request');
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    board ? res.json(board) : res.status(404).send('Board not found');
  })
  .put(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    board ? res.json(board) : res.status(400).send('Bad request');
  })
  .delete(async (req, res) => {
    (await boardsService.deleteBoard(req.params.id))
      ? res.status(204).end()
      : res.status(404).send('Board not found');
  });

module.exports = router;
