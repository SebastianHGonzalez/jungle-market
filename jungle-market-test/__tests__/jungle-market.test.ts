import { getShoppingCartsFromBranch, customerEntersBranch } from 'service';


describe('jungle-market', () => {
  const branchId = 'branch1';
  const customerId = 'customer1';
  const customerNonce = '1234567890dvahusjio';

  it('runs', async () => {
    await customerEntersBranch(customerNonce, branchId);

    await new Promise((resolve) => { setTimeout(resolve, 500); });

    const { data: { shoppingCarts: { shoppingCarts } } } = await getShoppingCartsFromBranch(branchId);
    expect(shoppingCarts).toHaveLength(1);
    expect(shoppingCarts[0].customer.nonce).toBe(customerNonce);
  });
});
