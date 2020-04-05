const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router
  .route('/')
  .post(async (req, res) => {
    const newTask = await tasksService.addTask({
      ...req.body,
      boardId: req.boardId
    });
    newTask ? res.json(newTask) : res.status(400).send('Bad request');
  })
  .get(async (req, res) => {
    res.json(await tasksService.getAll(req.boardId));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const task = await tasksService.getTask(req.boardId, req.params.id);
    task ? res.json(task) : res.status(404).send('Task not found');
  })
  .put(async (req, res) => {
    const task = await tasksService.updateTask(
      req.boardId,
      req.params.id,
      req.body
    );
    res.json(task);
  })
  .delete(async (req, res) => {
    (await tasksService.deleteTask(req.boardId, req.params.id))
      ? res.status(204).end()
      : res.status(404).send('Task not found');
  });

module.exports = router;
