const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// .env faylini o‘qish
try { require('dotenv').config(); } catch (e) {}

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- MongoDB ulanish ----------
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/m-market';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB ga ulandi'))
  .catch(err => {
    console.error('❌ MongoDB xatosi:', err.message);
    process.exit(1);
  });

// ---------- Middleware ----------
app.use(cors());
app.use(express.json({ limit: '50mb' }));
// Statik fayllar uchun
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Route'larni ulash ----------
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// ---------- Frontend (SPA) ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------- Serverni ishga tushirish ----------
app.listen(PORT, () => {
  console.log(`✅ Server ${PORT}-portda ishlamoqda`);
});