const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: String
  },
  items: [{
    name: String,
    color: String,
    size: String,
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: 'yangi' },
  paymentMethod: { type: String, default: 'naqd' }
}, { timestamps: true });

orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const now = new Date();
    const y = String(now.getFullYear()).slice(-2);
    const m = String(now.getMonth()+1).padStart(2,'0');
    const d = String(now.getDate()).padStart(2,'0');
    const r = Math.floor(Math.random()*9000)+1000;
    this.orderNumber = `M-${y}${m}${d}-${r}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);