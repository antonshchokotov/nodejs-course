const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number,
        _id: { type: String, default: uuid }
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title } = board;
  const boardToResponse = {
    id,
    title,
    columns: []
  };
  for (const column of board.columns) {
    /* eslint-disable-next-line no-shadow */
    const { id, title, order } = column;
    boardToResponse.columns.push({ id, title, order });
  }
  return boardToResponse;
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
