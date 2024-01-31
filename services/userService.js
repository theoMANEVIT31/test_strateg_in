const User = require('../models/user');

const getAllUsers = async () => {
  try {
    const users = await User.find().select('-_id -password -__v');
    return users;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs dans le service');
  }
};

module.exports = {
  getAllUsers,
};
