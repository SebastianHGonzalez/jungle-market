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
      type ClientPickedProductMutationResponse {
        clientId: ID
        skuId: ID
      }

      type Query {
        dummy: String
      }

      type Mutation {
        clientPickedProduct(
          clientId: ID!
          skuId: ID!
        ): ClientPickedProductMutationResponse
      }
    `;

    const resolvers = {
      Query: {
        dummy: () => 'ok',
      },
      Mutation: {
        clientPickedProduct: (parent: unknown, args: any) => {
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
                type: 'clientPickedProduct',
                clientId: args.clientId,
                skuId: args.skuId,
              }),
            ),
          );

          return {
            clientId: args.clientId,
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
