const boardsRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const addBoard = board => {
  if (!board.title || !board.columns[0]) return;
  for (const column of board.columns) {
    if (!column.title || !Number.isInteger(column.order)) return;
  }
  return boardsRepo.addBoard(board);
};

const updateBoard = (id, board) => {
  return boardsRepo.updateBoard(id, board);
};

const deleteBoard = async id => {
  const result = await boardsRepo.deleteBoard(id);
  if (result) tasksRepo.deleteTasks(id);
  return result;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
