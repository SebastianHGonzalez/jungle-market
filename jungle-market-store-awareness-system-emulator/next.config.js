require('dotenv').config();

module.exports = {
  serverRuntimeConfig: {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    jungleMarketCommandApiEndpoint: process.env.JUNGLE_MARKET_COMMAND_API_ENDPOINT,
  },
  publicRuntimeConfig: {
    jungleMarketCommandApiEndpoint: "/graphql",
  },
};
