import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function addProductToCart(customerNonce: string, skuId: string) {
  return ShoppingCart.findOneAndUpdate(
    { customerNonce, state: ShoppingCartState.OPEN },
    { $push: { products: skuId } },
    { new: true },
  );
}
