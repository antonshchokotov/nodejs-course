const userService = require('../users/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const authenticateUser = async (login, password) => {
  const user = await userService.getUserByLogin(login);
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const payload = { userId: user._id, login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '30m' });
  return token;
};

module.exports = { authenticateUser };
