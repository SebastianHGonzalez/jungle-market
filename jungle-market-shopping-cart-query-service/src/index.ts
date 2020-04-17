import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Sku {
    id: ID!
  }

  type ShoppingCartProduct {
    count: Int
    sku: Sku
  }

  type Branch {
    id: ID!
  }

  type Customer {
    id: ID!
  }

  type ShoppingCart {
    branch: Branch
    customer: Customer
    products: [ShoppingCartProduct]
  }

  type ShoppingCartsQueryResult {
    shoppingCarts: [ShoppingCart]
  }

  type Query {
    shoppingCarts(branchId: ID!): ShoppingCartsQueryResult
  }
`;

const branches = [{ id: '1' }];

const customers = [{ id: '2' }];

const skus = [{ id: '3' }];

const shoppingCarts = [
  {
    id: '4',
    branchId: '1',
    customerId: '2',
    products: [{ count: 2, skuId: '3' }],
  },
];

const resolvers = {
  Query: {
    shoppingCarts: (parent: unknown, args: any) => ({
      shoppingCarts: shoppingCarts.filter(
        ({ branchId }) => branchId === args.branchId,
      ),
    }),
  },
  ShoppingCart: {
    branch: (shoppingCart: any) => branches.find(({ id }) => id === shoppingCart.branchId),
    customer: (shoppingCart: any) => customers.find(({ id }) => id === shoppingCart.customerId),
  },
  ShoppingCartProduct: {
    sku: (shoppingCartProduct: any) => skus.find(({ id }) => id === shoppingCartProduct.skuId),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
