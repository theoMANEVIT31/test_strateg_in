const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
};

module.exports = {
  getAllUsers,
};
