const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('Utilisateur enregistré avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur');
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send('Utilisateur non trouvé');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).send('Mot de passe incorrect');
  }

  const token = jwt.sign({ userId: user._id }, 'hsH1u3TjCBvER5sbdzBxPky3A4olIvQ1WrezxALGSGIjui3orzfHIkKMvHUDqSiCud4T2LSmgClV8M1phrfemfvdKPisXlO8ZMZW', { expiresIn: '1h' });
  res.status(200).json({ token });
};

module.exports = {
  registerUser,
  loginUser,
};
