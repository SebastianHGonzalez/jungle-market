import mongoose, { Schema } from 'mongoose';

export enum ShoppingCartState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

const ShoppingCartSchema = new Schema({
  customerNonce: { type: String, default: '' },
  customerId: { type: String, default: '' },
  branchId: { type: String, default: '' },
  products: {
    type: [],
    default: [],
  },
  state: { type: ShoppingCartState, default: ShoppingCartState.OPEN },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

mongoose.model('ShoppingCart', ShoppingCartSchema);
