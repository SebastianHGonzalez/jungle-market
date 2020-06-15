export type ID = string;
export type Sku = { id: ID; shortName: string };
export type ProductCount = { count: number; sku: Sku };
export type Customer = { id: ID; nonce: ID; fullName: string };
export type ShoppingCartState = 'OPEN' | 'CLOSED';
export type Branch = { id: ID; cname: string };
export type ShoppingCart = {
  id: ID;
  branch: Branch;
  customer: Customer;
  products: ProductCount[];
  state: ShoppingCartState;
}
