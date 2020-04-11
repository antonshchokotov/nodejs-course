const router = require('express').Router();
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const { customError, catchError } = require('../../common/error');

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
  .get(
    catchError(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards);
    })
  )
  .post(
    catchError(async (req, res) => {
      const newBoard = await boardsService.addBoard(req.body);
      if (newBoard) {
        res.json(newBoard);
      } else {
        throw new customError(400, 'Bad request');
      }
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const board = await boardsService.getBoard(req.params.id);
      if (board) {
        res.json(board);
      } else {
        throw new customError(404, 'Board not found');
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const board = await boardsService.updateBoard(req.params.id, req.body);
      if (board) {
        res.json(board);
      } else {
        throw new customError(400, 'Bad request');
      }
    })
  )
  .delete(
    catchError(async (req, res) => {
      if (await boardsService.deleteBoard(req.params.id)) {
        res.status(204).end();
      } else {
        throw new customError(404, 'Board not found');
      }
    })
  );

module.exports = router;
