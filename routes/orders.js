const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authenticate } = require('../middleware/auth');

// Yangi buyurtma qo'shish (hammadan)
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, orderNumber: order.orderNumber });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Barcha buyurtmalarni olish (admin uchun)
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Buyurtmani o'chirish (admin uchun)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;