import amqp from 'amqplib';
import mongoose from 'mongoose';

import './model';
import getConfig from './config';
import addProductToCart from './services/addProductToCart';

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

    switch (type) {
      case 'clientPickedProduct':
        console.info('received message');
        addProductToCart(payload.clientId, payload.skuId)
          .then(() => {
            channel.ack(msg);
          })
          .catch(() => {
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
        .then(() => channel.consume(q.queue, (msg) => onMessage(channel, msg), { noAck: true }));
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
