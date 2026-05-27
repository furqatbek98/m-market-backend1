const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

// Barcha mahsulotlarni olish
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Mahsulot qo'shish (admin uchun)
router.post('/', authenticate, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Mahsulotni yangilash (admin uchun)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: product });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Mahsulotni o'chirish (admin uchun)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;