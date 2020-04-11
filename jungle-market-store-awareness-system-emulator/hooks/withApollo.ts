import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import getConfig from 'next/config';

export default withApollo(({ initialState }) => {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  const uri = serverRuntimeConfig.jungleMarketCommandApiEndpoint
    || publicRuntimeConfig.jungleMarketCommandApiEndpoint;

  return new ApolloClient({
    uri,
    cache: new InMemoryCache().restore(initialState || {}),
  });
});
