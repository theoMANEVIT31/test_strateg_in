const bcrypt = require('bcrypt');
const User = require('../models/user');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = {
  hashPassword,
};
