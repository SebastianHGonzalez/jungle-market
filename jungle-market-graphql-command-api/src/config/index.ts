import { config } from 'dotenv';

config();

export default function getConfig() {
  return {
    amqpURL: process.env.JUNGLE_MARKET_AMQP_URL,
    exchange: process.env.JUNGLE_MARKET_AMQP_EXCHANGE,
    exchangeType: process.env.JUNGLE_MARKET_AMQP_EXCHANGE_TYPE,
    routingKey: process.env.JUNGLE_MARKET_AMQP_ROUTING_KEY,
  };
}
