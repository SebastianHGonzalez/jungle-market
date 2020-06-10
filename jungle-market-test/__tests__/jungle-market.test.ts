import { getShoppingCartsFromBranch, customerEntersBranch } from 'service';


describe('jungle-market', () => {
  const branchId = 'branch1';
  const customerId = 'customer1';
  const customerNonce = '1234567890dvahusjio';

  test('when a customer enters a branch a shopping cart is created with his customer nonce', async () => {
    await customerEntersBranch(customerNonce, branchId);

    await new Promise((resolve) => { setTimeout(resolve, 500); });

    const { data: { shoppingCarts: { shoppingCarts } } } = await getShoppingCartsFromBranch(branchId);
    const customerShoppingCart = shoppingCarts.find(
      (shoppingCart: { customer: { nonce: string }; state: string }) => shoppingCart.customer.nonce === customerNonce && shoppingCart.state === 'OPEN'
    );

    expect(customerShoppingCart).toBeTruthy();
  });
});
