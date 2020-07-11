import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import fetch from 'node-fetch';

import getConfig from '../config';

let client: ApolloClient<InMemoryCache> | null = null;
function getCustomerServiceClient() {
  if (!client) {
    const { customerQueryServiceUrl } = getConfig();
    client = new ApolloClient({
      uri: customerQueryServiceUrl,
      fetch: fetch as any,
    });
  }
  return client;
}

const CUSTOMER_BY_ID_QUERY = gql`
  query getCustomerById($customerId: ID!) {
    customer: Customer(id: $customerId) {
      id
      fullName
    }
  }
`;

interface CustomerByIdQueryResponse {
  customer: {
    id: string;
    fullName: string;
  };
}

export default function getCustomerById(customerId: string) {
  return getCustomerServiceClient().query<CustomerByIdQueryResponse>({
    query: CUSTOMER_BY_ID_QUERY,
    variables: {
      customerId,
    },
  }).then(({ data: { customer } }) => customer);
}
