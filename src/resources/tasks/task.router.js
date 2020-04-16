const router = require('express').Router();
const tasksService = require('./task.service');
const { customError, catchError } = require('../../common/error');
const Task = require('./task.model');

router
  .route('/')
  .post(
    catchError(async (req, res) => {
      const newTask = await tasksService.addTask({
        ...req.body,
        boardId: req.boardId
      });
      if (newTask) {
        res.json(Task.toResponse(newTask));
      } else {
        throw new customError(400, 'Bad request');
      }
    })
  )
  .get(
    catchError(async (req, res) => {
      const tasks = await tasksService.getAll(req.boardId);
      res.json(tasks.map(el => Task.toResponse(el)));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const task = await tasksService.getTask(req.boardId, req.params.id);
      if (task) {
        res.json(Task.toResponse(task));
      } else {
        throw new customError(404, 'Task not found');
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const task = await tasksService.updateTask(
        req.boardId,
        req.params.id,
        req.body
      );
      res.json(task);
    })
  )
  .delete(
    catchError(async (req, res) => {
      if (await tasksService.deleteTask(req.boardId, req.params.id)) {
        res.status(204).end();
      } else {
        throw new customError(404, 'Task not found');
      }
    })
  );

module.exports = router;
