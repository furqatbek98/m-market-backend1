const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@m-market.tj';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin', email, role: 'admin' }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '1d' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ error: 'Login yoki parol xato' });
});

module.exports = router;