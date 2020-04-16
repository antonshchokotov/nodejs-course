const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [
  new User({ name: 'name1', login: 'login1', password: 'password1' }),
  new User({ name: 'name2', login: 'login2', password: 'password2' }),
  new User({ name: 'name3', login: 'login3', password: 'password3' })
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

module.exports = { users, boards, tasks };
