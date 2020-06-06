import amqp from 'amqplib';
import mongoose from 'mongoose';

import './model';
import getConfig from './config';

import createShoppingCartForCustomerAtBranch from './services/createShoppingCartForCustomerAtBranch';
import addCustomerIdToCart from './services/addCustomerIdToCart';
import addProductToCart from './services/addProductToCart';
import closeShoppingCart from './services/closeShoppingCart';

const {
  mongoURL,
  amqpURL,
  exchange,
  exchangeType,
  queue,
  pattern,
} = getConfig();

function onMessage(channel: amqp.Channel, msg: amqp.ConsumeMessage) {
  if (msg.content) {
    const { type, ...payload } = JSON.parse(msg.content.toString());
    console.info('received message type: ', type);
    switch (type) {
      case 'customerEntersBranch':
        createShoppingCartForCustomerAtBranch(payload.customerNonce, payload.branchId)
          .then((v) => {
            console.info("Success: createShoppingCartForCustomerAtBranch", v)
            channel.ack(msg);
          })
          .catch((error: Error) => {
            console.error("Error: createShoppingCartForCustomerAtBranch", error);
            channel.nack(msg, false, true);
          });
        break;
      case 'customerIdentified':
        addCustomerIdToCart(payload.customerNonce, payload.customerId)
          .then((v) => {
            console.info("Success: addCustomerIdToCart", v)
            channel.ack(msg);
          })
          .catch((error: Error) => {
            console.error("Error: addCustomerIdToCart", error);
            channel.nack(msg, false, true);
          });
        break;
      case 'customerPickedProduct':
        addProductToCart(payload.customerNonce, payload.skuId)
          .then((v) => {
            console.info("Success: addProductToCart", v)
            channel.ack(msg);
          })
          .catch((error: Error) => {
            console.error("Error: addProductToCart", error);
            channel.nack(msg, false, true);
          });
        break;
      case 'customerLeaves':
        closeShoppingCart(payload.customerNonce)
          .then((v) => {
            console.info("Success: customerLeaves", v)
            channel.ack(msg);
          })
          .catch((error: Error) => {
            console.error("Error: customerLeaves", error);
            channel.nack(msg, false, true);
          });
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('Unhandled message type: ', type);
        break;
    }
  }
}

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

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    throw new ApplicationError(510, error);
  })
  .then(() => amqp.connect(amqpURL))
  .catch((error) => {
    throw new ApplicationError(520, error);
  })
  .then((connection) => connection.createChannel())
  .then((channel) => {
    channel.assertExchange(exchange, exchangeType, { durable: false });
    return channel.assertQueue(queue, { exclusive: true }).then((q) => {
      console.log(
        ' [*] Waiting for messages in %s. To exit press CTRL+C',
        q.queue,
      );

      return channel
        .bindQueue(q.queue, exchange, pattern)
        .then(() => channel.consume(q.queue, (msg) => onMessage(channel, msg), { }));
    });
  })
  .catch((error) => {
    throw new ApplicationError(500, error);
  })
  .catch((error) => {
    // eslint-disable-next-line no-unused-expressions
    error.log && error.log(console);
    process.exit(error.code || 500);
  });
