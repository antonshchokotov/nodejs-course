const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');
const bcrypt = require('bcrypt');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const getUserByLogin = login => usersRepo.getUserByLogin(login);

const addUser = async user => {
  if (!user.name || !user.login || !user.password) return;
  const passwordHash = await bcrypt.hash(user.password, 10);
  return usersRepo.addUser({ ...user, password: passwordHash });
};

const updateUser = user => {
  if (!user.name || !user.login) return;
  const userToUpdate = { ...user };
  delete userToUpdate.password;
  return usersRepo.updateUser(userToUpdate);
};

const deleteUser = async id => {
  const result = await usersRepo.deleteUser(id);
  if (result) await tasksRepo.unassignTasks(id);
  return result;
};

module.exports = {
  getAll,
  getUser,
  getUserByLogin,
  addUser,
  updateUser,
  deleteUser
};
