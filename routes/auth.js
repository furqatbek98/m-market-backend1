const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

// Ro'yxatdan o'tish
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email va parol kerak' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Bu email band' });

    const user = await User.create({ name, email, phone, password });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '7d' });

    res.status(201).json({ success: true, token, user: { name: user.name, email: user.email, phone: user.phone } });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Tizimga kirish
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Email yoki parol xato' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: 'Email yoki parol xato' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '7d' });
    res.json({ success: true, token, user: { name: user.name, email: user.email, phone: user.phone } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Profil
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;