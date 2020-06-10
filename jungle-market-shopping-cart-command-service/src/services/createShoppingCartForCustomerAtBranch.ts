import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function createShoppingCartForCustomerAtBranch(customerNonce: string, branchId: string) {
  return ShoppingCart.findOneAndUpdate(
    { customerNonce, branchId, state: ShoppingCartState.OPEN },
    {},
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
}
