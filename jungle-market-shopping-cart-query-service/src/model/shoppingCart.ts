import mongoose, { Schema } from 'mongoose';

const ShoppingCartSchema = new Schema({
  owner: String,
  products: {
    type: [],
    default: [],
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

mongoose.model('ShoppingCart', ShoppingCartSchema);
