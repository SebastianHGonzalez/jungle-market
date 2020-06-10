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
      type CustomerEntersBranchMutationResponse {
        customerNonce: ID!
        branchId: ID!
      }

      type CustomerIdentifiedMutationResponse {
        customerNonce: ID!
        customerId: ID!
      }

      type CustomerPickedProductMutationResponse {
        customerNonce: ID
        skuId: ID
      }

      type CustomerDroppedProductMutationResponse {
          customerNonce: ID!
          skuId: ID!
      }

      type CustomerLeavesMutationResponse {
        customerNonce: ID!
      }

      type Query {
        dummy: String
      }

      type Mutation {
        customerEntersBranch(
          customerNonce: ID!
          branchId: ID!
        ): CustomerEntersBranchMutationResponse

        customerIdentified(
          customerNonce: ID!
          customerId: ID!
        ): CustomerIdentifiedMutationResponse

        customerPickedProduct(
          customerNonce: ID!
          skuId: ID!
        ): CustomerPickedProductMutationResponse
      
        customerDroppedProduct(
          customerNonce: ID!
          skuId: ID!
        ): CustomerDroppedProductMutationResponse

        customerLeaves(
          customerNonce: ID!
        ): CustomerLeavesMutationResponse
      }
    `;

    const resolvers = {
      Query: {
        dummy: () => 'ok',
      },
      Mutation: {
        customerEntersBranch: (parent: unknown, { customerNonce, branchId }: any) => {
          channel.publish(
            exchange,
            routingKey,
            Buffer.from(
              JSON.stringify({
                type: 'customerEntersBranch',
                customerNonce,
                branchId,
              }),
            ),
          );

          return {
            customerNonce,
            branchId,
          };
        },
        customerIdentified: (parent: unknown, { customerNonce, customerId }: any) => {
          channel.publish(
            exchange,
            routingKey,
            Buffer.from(
              JSON.stringify({
                type: 'customerIdentified',
                customerNonce,
                customerId,
              }),
            ),
          );

          return {
            customerNonce,
            customerId,
          };
        },
        customerPickedProduct: (parent: unknown, { customerNonce, skuId }: any) => {
          channel.publish(
            exchange,
            routingKey,
            Buffer.from(
              JSON.stringify({
                type: 'customerPickedProduct',
                customerNonce,
                skuId,
              }),
            ),
          );

          return {
            customerNonce,
            skuId,
          };
        },
        customerDroppedProduct: (parent: unknown, { customerNonce, skuId }: any) => {
          channel.publish(
            exchange,
            routingKey,
            Buffer.from(
              JSON.stringify({
                type: 'customerDroppedProduct',
                customerNonce,
                skuId,
              }),
            ),
          );

          return {
            customerNonce,
            skuId,
          };
        },
        customerLeaves: (parent: unknown, { customerNonce }: any) => {
          channel.publish(
            exchange,
            routingKey,
            Buffer.from(
              JSON.stringify({
                type: 'customerLeaves',
                customerNonce,
              }),
            ),
          );

          return {
            customerNonce
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
