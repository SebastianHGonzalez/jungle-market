require('dotenv').config();

module.exports = {
  serverRuntimeConfig: {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    jungleMarketQueryApiEndpoint: process.env.JUNGLE_MARKET_QUERY_API_ENDPOINT_PRIVATE,
  },
  publicRuntimeConfig: {
    jungleMarketQueryApiEndpoint: process.env.JUNGLE_MARKET_QUERY_API_ENDPOINT,
  },
};
