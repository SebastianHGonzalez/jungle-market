module.export = {
  serverRuntimeConfig: {
    jungleMarketCommandApiEndpoint: process.env.JUNGLE_MARKET_COMMAND_API_ENDPOINT_PRIVATE,
  },
  publicRuntimeConfig: {
    jungleMarketCommandApiEndpoint: process.env.JUNGLE_MARKET_COMMAND_API_ENDPOINT,
  },
};
