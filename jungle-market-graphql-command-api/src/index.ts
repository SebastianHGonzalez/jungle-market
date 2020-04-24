import amqp from 'amqplib';
import { ApolloServer, gql } from 'apollo-server';

import getConfig from './config';

const {
  amqpURL, exchange, exchangeType, routingKey,
} = getConfig();

amqp
  .connect(amqpURL)
  .then((connection) => connection.createChannel().catch((e) => {
    connection.close();
    throw e;
  }))
  .then((channel) => {
    channel.assertExchange(exchange, exchangeType, {
      durable: false,
    });

    const typeDefs = gql`
      type CustomerPickedProductMutationResponse {
        customerId: ID
        skuId: ID
      }

      type Query {
        dummy: String
      }

      type Mutation {
        customerPickedProduct(
          customerId: ID!
          skuId: ID!
        ): CustomerPickedProductMutationResponse
      }
    `;

    const resolvers = {
      Query: {
        dummy: () => 'ok',
      },
      Mutation: {
        customerPickedProduct: (parent: unknown, args: any) => {
          console.log(
            'publishing',
            'exchange: ',
            exchange,
            'routingKey: ',
            routingKey,
          );
          channel.publish(
            exchange,
            routingKey,
            Buffer.from(
              JSON.stringify({
                type: 'customerPickedProduct',
                customerId: args.customerId,
                skuId: args.skuId,
              }),
            ),
          );

          return {
            customerId: args.customerId,
            skuId: args.skuId,
          };
        },
      },
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  });
