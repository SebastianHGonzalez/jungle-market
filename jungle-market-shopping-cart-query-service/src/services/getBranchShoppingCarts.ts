import { model } from 'mongoose';

const ShoppingCart = model('ShoppingCart');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getBranchShoppingCarts(branchId: string) {
  return ShoppingCart.find({});
}
