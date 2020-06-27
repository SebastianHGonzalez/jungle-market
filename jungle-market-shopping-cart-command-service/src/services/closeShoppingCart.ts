import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function closeShoppingCart(customerNonce: string) {
  const historyNode = { name: 'customerLeaves' };

  return ShoppingCart.findOneAndUpdate(
    { customerNonce, state: ShoppingCartState.OPEN },
    { state: ShoppingCartState.CLOSED, $push: { history: historyNode } },
    { new: true },
  );
}
