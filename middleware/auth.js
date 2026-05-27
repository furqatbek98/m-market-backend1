const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token kerak' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    next();
  } catch (e) {
    res.status(403).json({ error: 'Yaroqsiz token' });
  }
};

module.exports = { authenticate };