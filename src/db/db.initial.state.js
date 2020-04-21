const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const bcrypt = require('bcrypt');

// eslint-disable-next-line no-sync
const adminPasswordHash = bcrypt.hashSync('admin', 10);

const users = [
  new User({ name: 'John Doe', login: 'admin', password: adminPasswordHash })
];

const boards = [
  new Board({
    title: 'board1',
    columns: [
      { title: 'column11', order: 11 },
      { title: 'column12', order: 12 }
    ]
  }),
  new Board({
    title: 'board2',
    columns: [
      { title: 'column21', order: 21 },
      { title: 'column22', order: 22 }
    ]
  })
];

const tasks = [
  new Task({
    title: 'task1',
    order: 100,
    description: 'task1_description'
  })
];

const DBInitialState = () => {
  users.forEach(user => user.save());
  boards.forEach(board => board.save());
  tasks.forEach(task => task.save());
};

module.exports = DBInitialState;
