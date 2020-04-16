const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const addUser = user => {
  if (!user.name || !user.login || !user.password) return;
  return usersRepo.addUser(user);
};

const updateUser = user => {
  if (!user.name || !user.login || !user.password) return;
  return usersRepo.updateUser(user);
};

const deleteUser = async id => {
  const result = await usersRepo.deleteUser(id);
  if (result) await tasksRepo.unassignTasks(id);
  return result;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
