import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';

import './model';
import getConfig from './config';
import getBranchShoppingCarts from './services/getBranchShoppingCarts';
import getShoppingCart from './services/getShoppingCart';

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
  type Sku {
    id: ID!
    shortName: String
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
    nonce: String
    fullName: String
  }

  type ShoppingCart {
    id: ID
    branch: Branch
    customer: Customer
    products: [ShoppingCartProduct]
    state: String
  }

  type ShoppingCartsQueryResult {
    shoppingCarts: [ShoppingCart]
  }
  type ShoppingCartQueryResult {
    shoppingCart: ShoppingCart
  }

  type Query {
    shoppingCarts(branchId: ID!): ShoppingCartsQueryResult
    shoppingCart(id: ID!): ShoppingCartQueryResult
  }
`;

const branches = [{ id: 'branch1', cname: 'Quilmes Center' }, { id: 'branch2', cname: 'BeraMall' }];

const customers = [{ id: 'customer1', fullName: 'juan domingo' }, { id: 'customer2', fullName: 'eva duarte' }];

const skus = [{ id: 'sku1', shortName: 'papas' }, { id: 'sku2', shortName: 'bondiola' }];

const resolvers = {
  Query: {
    shoppingCarts: (parent: unknown, args: any) => ({
      shoppingCarts: getBranchShoppingCarts(args.branchId),
    }),
    shoppingCart: (parent: unknown, args: any) => ({
      shoppingCart: getShoppingCart(args.id),
    }),
  },
  ShoppingCart: {
    branch: (shoppingCart: any) => branches.find(({ id }) => id === shoppingCart.branchId),
    customer: (shoppingCart: any) => ({ ...(customers.find(({ id }) => id === shoppingCart.customerId) ?? {}), nonce: shoppingCart.customerNonce }),
    products: (shoppingCart: any) => Object.entries(shoppingCart.products).map(([id, count]) => ({ sku: { id }, count })).filter(({ count }) => count),
    state: (shoppingCart: any) => shoppingCart.state,
  },
  ShoppingCartProduct: {
    sku: (shoppingCartProduct: any) => skus.find(({ id }) => id === shoppingCartProduct.sku.id),
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
