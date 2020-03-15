import express, { Application } from 'express';
import amqp from 'amqplib';

import { Config } from 'config';
import createSendEventHandler from './handlers/sendEvent';

export default function createApp({ AMQP_URL }: Config): Promise<Application> {
  return amqp.connect(AMQP_URL)
    .then((connection) => connection.createChannel()
      .catch((e) => { connection.close(); throw e; }))
    .then((ch) => {
      const app = express();

      app.get('/', createSendEventHandler(ch));

      return app;
    });
}
