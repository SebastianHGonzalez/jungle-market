import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function createShoppingCartForCustomerAtBranch(customerNonce: string, branchId: string) {
  const historyNode = { name: 'customerEntersBranch' };

  return ShoppingCart.findOneAndUpdate(
    { customerNonce, branchId, state: ShoppingCartState.OPEN },
    { $push: { history: historyNode } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
}
