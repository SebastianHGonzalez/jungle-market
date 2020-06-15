import { model } from 'mongoose';

const ShoppingCart = model('ShoppingCart');

export default function getShoppingCart(id: string) {
  return ShoppingCart.findById(id);
}
