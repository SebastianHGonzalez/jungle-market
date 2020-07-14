import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import fetch from 'node-fetch';

import getConfig from '../config';

let client: ApolloClient<InMemoryCache> | null = null;
function getCatalogServiceClient() {
  if (!client) {
    const { catalogQueryServiceUrl } = getConfig();
    client = new ApolloClient({
      uri: catalogQueryServiceUrl,
      fetch: fetch as any,
    });
  }
  return client;
}

const SKU_BY_ID_QUERY = gql`
  query getSkuById($skuId: ID!) {
    sku: Sku(id: $skuId) {
      id
      shortName
      price
    }
  }
`;

interface SkuByIdQueryResponse {
  sku: {
    id: string;
    shortName: string;
    price: string;
  };
}

export default function getCatalogById(skuId: string) {
  return getCatalogServiceClient().query<SkuByIdQueryResponse>({
    query: SKU_BY_ID_QUERY,
    variables: {
      skuId,
    },
  }).then(({ data: { sku } }) => sku);
}
