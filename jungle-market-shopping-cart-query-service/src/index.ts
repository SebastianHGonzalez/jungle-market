import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';

import './model';
import getConfig from './config';
import getAggregation from './services/getAggregation';
import getShoppingCarts from './services/getShoppingCarts';
import getShoppingCart from './services/getShoppingCart';
import getCustomerById from './services/getCustomerById';
import getSkuById from './services/getSkuById';

const { mongoURL, port } = getConfig();

class ApplicationError extends Error {
  log(logger: typeof console) {
    logger.error('Application Error:', this.code, this.message);
  }

  public readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

const typeDefs = gql`
  scalar Date

  type Sku {
    id: ID!
    shortName: String
  }

  type ShoppingCartEventPayload {
    sku: Sku
    customer: Customer
  }

  type ShoppingCartEvent {
    name: String
    payload: ShoppingCartEventPayload
    createdAt: Date
  }

  type ShoppingCartProduct {
    count: Int
    sku: Sku
  }

  type Branch {
    id: ID!
    cname: String
  }

  type Customer {
    id: ID
    nonce: ID
    fullName: String
  }

  type ShoppingCart {
    id: ID
    branch: Branch
    customer: Customer
    history: [ShoppingCartEvent]
    products: [ShoppingCartProduct]
    state: String
  }

  type ShoppingCartsQueryResult {
    count: Int
    shoppingCarts: [ShoppingCart]
  }
  type ShoppingCartQueryResult {
    shoppingCart: ShoppingCart
  }

  type Query {
    shoppingCarts(branchId: [ID!], customerNonce: [ID!], customerId: [ID!], from: Date, state: [String!]): ShoppingCartsQueryResult
    shoppingCart(id: ID!): ShoppingCartQueryResult
  }
`;

const branches = [{ id: 'branch1', cname: 'Quilmes Center' }, { id: 'branch2', cname: 'BeraMall' }];

const skus = [{ id: 'sku1', shortName: 'papas' }, { id: 'sku2', shortName: 'bondiola' }];

const resolvers = {
  Query: {
    shoppingCarts: (parent: unknown, args: any) => ({
      count: getAggregation({
        from: args.from,
        state: args.state,
        branchIds: args.branchId,
        customerNonces: args.customerNonce,
        customerIds: args.customerId,
      }),
      shoppingCarts: getShoppingCarts({
        from: args.from,
        state: args.state,
        branchIds: args.branchId,
        customerNonces: args.customerNonce,
        customerIds: args.customerId,
      }),
    }),
    shoppingCart: (parent: unknown, args: any) => ({
      shoppingCart: getShoppingCart(args.id),
    }),
  },
  ShoppingCart: {
    branch: (shoppingCart: any) => branches.find(({ id }) => id === shoppingCart.branchId),
    customer: async (shoppingCart: any) => ({ ...(await getCustomerById(shoppingCart.customerId)), nonce: shoppingCart.customerNonce }),
    products: (shoppingCart: any) => Object.entries(shoppingCart.products).map(([id, count]) => ({ sku: { id }, count })).filter(({ count }) => count),
    state: (shoppingCart: any) => shoppingCart.state,
  },
  ShoppingCartProduct: {
    sku: (shoppingCartProduct: any) => shoppingCartProduct?.sku?.id && getSkuById(shoppingCartProduct.sku.id),
  },
  ShoppingCartEventPayload: {
    sku: (shoppingCartEventPayload: any) => shoppingCartEventPayload.sku?.id && getSkuById(shoppingCartEventPayload.sku.id),
    customer: (shoppingCartEventPayload: any) => shoppingCartEventPayload.customer?.id && getCustomerById(shoppingCartEventPayload.customer.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    throw new ApplicationError(510, error);
  })
  .then(() =>
    // The `listen` method launches a web server.
    server.listen({ port }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    }))
  .catch((error) => {
    // eslint-disable-next-line no-unused-expressions
    error.log && error.log(console);
    process.exit(error.code || 500);
  });
