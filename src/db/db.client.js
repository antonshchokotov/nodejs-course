const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { users, boards, tasks } = require('./db.initial.state');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    await db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    console.log('connected to DB');
    cb();
  });
};

module.exports = { connectToDB };
