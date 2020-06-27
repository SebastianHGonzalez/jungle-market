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
query getShoppingCartsFromBranch($customerNonce: [ID!]){
  shoppingCarts(customerNonce: $customerNonce) {
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

const customerIdentifiesMutation = gql`
  mutation customerIdentifies(
    $customerNonce: ID!
    $customerId: ID!
  ) {
      customerIdentified(
        customerNonce: $customerNonce
        customerId: $customerId
      ) {
      customerNonce
      customerId
    }
  }
`;

const customerPicksUpAProductMutation = gql`
  mutation customerPicksUpAProduct(
    $customerNonce: ID!
    $skuId: ID!
  ) {
    customerPickedProduct(
      customerNonce: $customerNonce
      skuId: $skuId
    ) {
      customerNonce
      skuId
    }
  }
`;

const customerDroppedProductMutation = gql`
  mutation customerDroppedProduct(
    $customerNonce: ID!
    $skuId: ID!
  ) {
    customerDroppedProduct(
      customerNonce: $customerNonce
      skuId: $skuId
    ) {
      customerNonce
      skuId
    }
  }
`;

const customerLeavesMutation = gql`
  mutation customerLeaves(
    $customerNonce: ID!
  ) {
    customerLeaves(
      customerNonce: $customerNonce
    ) {
      customerNonce
    }
  }
`;

export function getShoppingCartFromCustomerNonce(customerNonce: string) {
  return queryClient.query({
    fetchPolicy: 'no-cache',
    query: getShoppingCartsFromBranchQuery,
    variables: {
      customerNonce,
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

export function customerIdentifiesAs(customerNonce: string, customerId: string) {
  return commandClient.mutate({
    mutation: customerIdentifiesMutation,
    variables: {
      customerNonce,
      customerId,
    },
  });
}

export function customerPicksUpAProduct(customerNonce: string, skuId: string) {
  return commandClient.mutate({
    mutation: customerPicksUpAProductMutation,
    variables: {
      customerNonce,
      skuId,
    },
  });
}

export function customerDropsOffAProduct(customerNonce: string, skuId: string) {
  return commandClient.mutate({
    mutation: customerDroppedProductMutation,
    variables: {
      customerNonce,
      skuId,
    },
  });
}

export function customerLeaves(customerNonce: string) {
  return commandClient.mutate({
    mutation: customerLeavesMutation,
    variables: {
      customerNonce,
    },
  });
}
