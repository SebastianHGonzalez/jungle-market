import amqp from 'amqplib';

import getConfig from './config';

const {
  amqpURL: rabbitURL, exchange, exchangeType, queue, pattern,
} = getConfig();

function onMessage(msg: amqp.ConsumeMessage) {
  if (msg.content) {
    console.log('message:', msg.content.toString());
  }
}

amqp
  .connect(rabbitURL)
  .then((connection) => connection.createChannel())
  .then((channel) => {
    channel.assertExchange(exchange, exchangeType, { durable: false });
    return channel.assertQueue(queue, { exclusive: true }).then((q) => {
      console.log(
        ' [*] Waiting for messages in %s. To exit press CTRL+C',
        q.queue,
      );

      channel.bindQueue(q.queue, exchange, pattern);

      channel.consume(q.queue, onMessage, {
        noAck: true,
      });
    });
  });
