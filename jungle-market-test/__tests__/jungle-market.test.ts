import { v4 as uuidv4 } from 'uuid';

import {
  getShoppingCartsFromBranch,
  customerEntersBranch,
  customerIdentifiesAs,
  customerPicksUpAProduct,
  customerDropsOffAProduct,
  customerLeaves,
} from 'service';

describe('jungle-market', () => {
  const branchId = 'branch1';
  const customerId = 'customer1';
  const sku1 = 'sku1';

  let customerNonce: string;

  beforeEach(() => {
    customerNonce = uuidv4();
  });

  test('when a customer enters a branch a shopping cart is created with his customer nonce', async () => {
    await customerEntersBranch(customerNonce, branchId);

    const { data: { shoppingCarts: { shoppingCarts } } } = await getShoppingCartsFromBranch(branchId);
    const customerShoppingCart = shoppingCarts.find(
      (shoppingCart: { customer: { nonce: string }; state: string }) => shoppingCart.customer.nonce === customerNonce && shoppingCart.state === 'OPEN',
    );

    expect(customerShoppingCart).toBeTruthy();
  });

  test('critical path', async () => {
    await customerEntersBranch(customerNonce, branchId);

    const { data: { shoppingCarts: { shoppingCarts: shoppingCarts1 } } } = await getShoppingCartsFromBranch(branchId);
    const customerShoppingCart1 = shoppingCarts1.find(
      (shoppingCart: { customer: { nonce: string }; state: string }) => shoppingCart.customer.nonce === customerNonce && shoppingCart.state === 'OPEN',
    );

    expect(customerShoppingCart1).toBeTruthy();

    await customerIdentifiesAs(customerNonce, customerId);

    const { data: { shoppingCarts: { shoppingCarts: shoppingCarts2 } } } = await getShoppingCartsFromBranch(branchId);
    const customerShoppingCart2 = shoppingCarts2.find(
      (shoppingCart: { customer: { nonce: string }; state: string }) => shoppingCart.customer.nonce === customerNonce && shoppingCart.state === 'OPEN',
    );

    expect(customerShoppingCart2.customer.id).toBe(customerId);


    await customerPicksUpAProduct(customerNonce, sku1);

    const { data: { shoppingCarts: { shoppingCarts: shoppingCarts3 } } } = await getShoppingCartsFromBranch(branchId);
    const customerShoppingCart3 = shoppingCarts3.find(
      (shoppingCart: { customer: { nonce: string }; state: string }) => shoppingCart.customer.nonce === customerNonce && shoppingCart.state === 'OPEN',
    );

    const product1 = customerShoppingCart3.products.find((p: { sku: { id: string } }) => p.sku.id === sku1);
    expect(product1.count).toBe(1);

    await customerLeaves(customerNonce);

    const { data: { shoppingCarts: { shoppingCarts: shoppingCarts4 } } } = await getShoppingCartsFromBranch(branchId);
    const customerShoppingCart4 = shoppingCarts4.find(
      (shoppingCart: { customer: { nonce: string }; state: string }) => shoppingCart.customer.nonce === customerNonce && shoppingCart.state === 'CLOSED',
    );

    const product2 = customerShoppingCart4.products.find((p: { sku: { id: string } }) => p.sku.id === sku1);
    expect(product2.count).toBe(1);
  });

  test('when customers drops a product it should be removed from their shopping cart', async () => {
    await customerEntersBranch(customerNonce, branchId);
    await customerPicksUpAProduct(customerNonce, sku1);
    await customerDropsOffAProduct(customerNonce, sku1);

    const { data: { shoppingCarts: { shoppingCarts } } } = await getShoppingCartsFromBranch(branchId);
    const customerShoppingCart = shoppingCarts.find(
      (shoppingCart: { customer: { nonce: string }; state: string }) => shoppingCart.customer.nonce === customerNonce && shoppingCart.state === 'OPEN',
    );

    expect(customerShoppingCart.products).toHaveLength(0);
  });
});
