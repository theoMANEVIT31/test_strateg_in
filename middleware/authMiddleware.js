const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Accès non autorisé');
  }

  jwt.verify(token, 'hsH1u3TjCBvER5sbdzBxPky3A4olIvQ1WrezxALGSGIjui3orzfHIkKMvHUDqSiCud4T2LSmgClV8M1phrfemfvdKPisXlO8ZMZW', (err, user) => {
    if (err) {
      return res.status(403).send('Token non valide');
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};