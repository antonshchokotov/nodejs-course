const Board = require('./board.model');

const getAll = async () => Board.find({});

const getBoard = async id => Board.findOne({ _id: id });

const addBoard = async board => Board.create(board);

const updateBoard = async (id, board) => {
  const boardToDB = {
    ...board,
    columns: board.columns.map(col => ({ ...col, _id: col.id }))
  };
  return (await Board.updateOne({ _id: id }, boardToDB)).ok ? board : null;
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
