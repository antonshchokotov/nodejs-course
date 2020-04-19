const User = require('./user.model');

const getAll = async () => User.find({});

const getUser = async id => User.findOne({ _id: id });

const addUser = async user => User.create(user);

const updateUser = async user => {
  return (await User.updateOne({ _id: user.id }, user)).ok ? user : null;
};

const deleteUser = async id => (await User.deleteOne({ _id: id })).ok;

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
