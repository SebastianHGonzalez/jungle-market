import { model } from 'mongoose';

import filterEmptyValues from '../lib/filterEmptyValues';

const ShoppingCart = model('ShoppingCart');

interface ShoppingCartQueryParams {
  from?: string;
  state?: string[];
  branchIds?: string[];
  customerIds?: string[];
  customerNonces?: string[];
}

export default function getBranchShoppingCarts({
  from,
  state,
  branchIds,
  customerIds,
  customerNonces,
}: ShoppingCartQueryParams) {
  return ShoppingCart.find(filterEmptyValues({
    createdAt: from && { $gt: new Date(from) },
    state: state && { $in: state },
    branchId: branchIds && { $in: branchIds },
    customerId: customerIds && { $in: customerIds },
    customerNonce: customerNonces && { $in: customerNonces },
  }),
  undefined,
  {
    $sort: {
      createdAt: -1,
    },
  });
}
