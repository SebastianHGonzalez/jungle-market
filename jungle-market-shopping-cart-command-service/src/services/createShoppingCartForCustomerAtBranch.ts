import { model } from 'mongoose';

const ShoppingCart = model('ShoppingCart');

export default function createShoppingCartForCustomerAtBranch(customerNonce: string, branchId: string) {
  return new ShoppingCart({ customerNonce, branchId }).save();
}
