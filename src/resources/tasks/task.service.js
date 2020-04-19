const tasksRepo = require('./task.db.repository');

const addTask = task => {
  return tasksRepo.addTask(task);
};

const getAll = async boardId => {
  return await tasksRepo.getAll(boardId);
};

const getTask = async (boardId, taskId) => {
  return await tasksRepo.getTask(boardId, taskId);
};

const updateTask = async (boardId, taskId, task) => {
  return await tasksRepo.updateTask(boardId, taskId, task);
};

const deleteTask = async (boardId, taskId) => {
  return await tasksRepo.deleteTask(boardId, taskId);
};

module.exports = { addTask, getAll, getTask, updateTask, deleteTask };
