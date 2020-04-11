module.export = {
  serverRuntimeConfig: {
    jungleMarketQueryApiEndpoint: process.env.JUNGLE_MARKET_QUERY_API_ENDPOINT_PRIVATE,
  },
  publicRuntimeConfig: {
    jungleMarketQueryApiEndpoint: process.env.JUNGLE_MARKET_QUERY_API_ENDPOINT,
  },
};
