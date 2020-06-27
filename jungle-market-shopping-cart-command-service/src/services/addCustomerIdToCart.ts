import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function addCustomerIdToCart(customerNonce: string, customerId: string) {
  const historyNode = { name: 'customerIdentified', payload: { customer: { id: customerId } } };

  return ShoppingCart.findOneAndUpdate(
    { customerNonce, state: ShoppingCartState.OPEN },
    { customerId, $push: { history: historyNode } },
    { new: true },
  );
}
