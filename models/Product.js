const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  brand: String,
  price: { type: Number, required: true },
  oldPrice: Number,
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  images: [String],
  desc: String,
  specs: { type: Map, of: String },
  colors: [String],
  sizes: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);