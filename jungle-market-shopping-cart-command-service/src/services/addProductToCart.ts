import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function addProductToCart(customerNonce: string, skuId: string) {
  const historyNode = { name: 'customerPickedProduct', payload: { sku: { id: skuId } } };

  return ShoppingCart.findOneAndUpdate(
    { customerNonce, state: ShoppingCartState.OPEN },
    { $inc: { [`products.${skuId}`]: 1 }, $push: { history: historyNode } },
    { new: true },
  );
}
