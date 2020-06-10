import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function removeProductFromCart(customerNonce: string, skuId: string) {
  return ShoppingCart.findOneAndUpdate(
    { customerNonce, state: ShoppingCartState.OPEN },
    { $inc: { [`products.${skuId}`]: -1 } },
    { new: true },
  );
}
