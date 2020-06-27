import { model } from 'mongoose';

import filterEmptyValues from '../lib/filterEmptyValues';

const ShoppingCart = model('ShoppingCart');

interface ShoppingCartQueryParams {
  branchIds?: string[];
  customerIds?: string[];
  customerNonces?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getBranchShoppingCarts({
  branchIds,
  customerIds,
  customerNonces,
}: ShoppingCartQueryParams) {
  return ShoppingCart.find(filterEmptyValues({
    branchId: branchIds && { $in: branchIds },
    customerId: customerIds && { $in: customerIds },
    customerNonce: customerNonces && { $in: customerNonces },
  }));
}
