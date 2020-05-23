import { model } from 'mongoose';

import { ShoppingCartState } from '../model/shoppingCart';

const ShoppingCart = model('ShoppingCart');

export default function addCustomerIdToCart(customerNonce: string, customerId: string) {
  return ShoppingCart.findOneAndUpdate(
    { customerNonce, state: ShoppingCartState.OPEN },
    { customerId },
  );
}
