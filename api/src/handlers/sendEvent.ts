import { Handler } from 'express';
import { Channel } from 'amqplib';

export default function createSendEventHandler(channel: Channel): Handler {
  const sendEventHandler: Handler = (req, res) => {
    const queue = 'hello';
    const msg = 'hello world';

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));

    res.send(`[x] Sent ${msg}`);
  };
  return sendEventHandler;
}
