import ApolloClient, { gql } from 'apollo-boost';
import fetch from 'node-fetch';

const QUERY_API_URI = 'http://localhost:4000/';
const COMMAND_API_URI = 'http://localhost:4001/';

const commandClient = new ApolloClient({
  fetch: fetch as any,
  uri: COMMAND_API_URI,
});
const queryClient = new ApolloClient({
  fetch: fetch as any,
  uri: QUERY_API_URI,
});

const getShoppingCartsFromBranchQuery = gql`
query getShoppingCartsFromBranch($branchId: ID!){
  shoppingCarts(branchId: $branchId) {
    shoppingCarts {
      branch {
        id
        cname
      }
      customer {
        id
        nonce
        fullName
      }
      products {
        count
        sku {
          id
          shortName
        }
      }
      state
    }
  }
}
`;

const customerEntersBranchMutation = gql`
mutation customerEntersBranch(
    $customerNonce: ID!
    $branchId: ID!
) {
  customerEntersBranch(
    customerNonce:  $customerNonce
    branchId: $branchId
  ) {
    customerNonce
    branchId
  }
  
}
`;

export function getShoppingCartsFromBranch(branchId: string) {
  return queryClient.query({
    query: getShoppingCartsFromBranchQuery,
    variables: {
      branchId,
    },
  });
}

export function customerEntersBranch(customerNonce: string, branchId: string) {
  return commandClient.mutate({
    mutation: customerEntersBranchMutation,
    variables: {
      customerNonce,
      branchId,
    },
  });
}
