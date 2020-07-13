import { v4 as uuidv4 } from 'uuid';

import {
  getShoppingCartFromCustomerNonce,
  customerEntersBranch,
  customerIdentifiesAs,
  customerPicksUpAProduct,
  customerDropsOffAProduct,
  customerLeaves,
} from 'service';

describe('jungle-market', () => {
  const branchId = 'branch1';
  const sku1 = 'sku1';

  let customerId: string;
  let customerNonce: string;

  beforeEach(() => {
    customerId = Math.ceil(Math.random() * 100).toString();
    customerNonce = uuidv4();
  });

  test('when a customer enters a branch a shopping cart is created with his customer nonce', async () => {
    await customerEntersBranch(customerNonce, branchId);

    const { data: { shoppingCarts: { shoppingCarts: [customerShoppingCart] } } } = await getShoppingCartFromCustomerNonce(customerNonce);

    expect(customerShoppingCart).toBeTruthy();
  });

  test('critical path', async () => {
    await customerEntersBranch(customerNonce, branchId);

    const { data: { shoppingCarts: { shoppingCarts: [customerShoppingCart1] } } } = await getShoppingCartFromCustomerNonce(customerNonce);

    expect(customerShoppingCart1).toBeTruthy();

    await customerIdentifiesAs(customerNonce, customerId);

    const { data: { shoppingCarts: { shoppingCarts: [customerShoppingCart2] } } } = await getShoppingCartFromCustomerNonce(customerNonce);

    expect(customerShoppingCart2.customer.id).toBe(customerId);


    await customerPicksUpAProduct(customerNonce, sku1);

    const { data: { shoppingCarts: { shoppingCarts: [customerShoppingCart3] } } } = await getShoppingCartFromCustomerNonce(customerNonce);

    const product1 = customerShoppingCart3.products.find((p: { sku: { id: string } }) => p.sku.id === sku1);
    expect(product1.count).toBe(1);

    await customerLeaves(customerNonce);

    const { data: { shoppingCarts: { shoppingCarts: [customerShoppingCart4] } } } = await getShoppingCartFromCustomerNonce(customerNonce);

    const product2 = customerShoppingCart4.products.find((p: { sku: { id: string } }) => p.sku.id === sku1);
    expect(product2.count).toBe(1);
  });

  test('when customers drop a product it should be removed from their shopping cart', async () => {
    await customerEntersBranch(customerNonce, branchId);
    await customerPicksUpAProduct(customerNonce, sku1);
    await customerDropsOffAProduct(customerNonce, sku1);

    const { data: { shoppingCarts: { shoppingCarts: [customerShoppingCart] } } } = await getShoppingCartFromCustomerNonce(customerNonce);

    expect(customerShoppingCart.products).toHaveLength(0);
  });

  test('when customers drop one item it should keep the other ones', async () => {
    await customerEntersBranch(customerNonce, branchId);
    await customerPicksUpAProduct(customerNonce, sku1);
    await customerPicksUpAProduct(customerNonce, sku1);
    await customerDropsOffAProduct(customerNonce, sku1);

    const { data: { shoppingCarts: { shoppingCarts: [customerShoppingCart] } } } = await getShoppingCartFromCustomerNonce(customerNonce);

    expect(customerShoppingCart.products).toHaveLength(1);
    expect(customerShoppingCart.products[0].count).toBe(1);
  });
});
