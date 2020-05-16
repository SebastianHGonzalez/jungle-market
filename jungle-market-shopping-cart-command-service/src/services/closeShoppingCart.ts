import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function closeShoppingCart(customerNonce: string) {
  return ShoppingCart.findOneAndUpdate(
    { customerNonce, state: ShoppingCartState.OPEN },
    { state: ShoppingCartState.CLOSED },
    { new: true, upsert: true },
  );
}
