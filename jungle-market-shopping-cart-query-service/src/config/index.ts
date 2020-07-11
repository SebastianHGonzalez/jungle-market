import { config } from 'dotenv';

config();

export default function getConfig() {
  return {
    customerQueryServiceUrl: process.env.JUNGLE_MARKET_CUSTOMER_QUERY_SERVICE_URL,
    mongoURL: process.env.JUNGLE_MARKET_SHOPPING_CART_DB_URL,
    port: process.env.PORT || 4000,
  };
}
