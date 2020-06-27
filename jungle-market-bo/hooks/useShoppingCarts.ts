import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { ShoppingCart } from 'model';

const GET_SHOPPING_CARTS = gql`
  query getShoppingCarts($branchId: [ID!]) {
    shoppingCarts(branchId: $branchId) {
      shoppingCarts {
        id
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

type ShoppingCartsQueryResponse = {
  shoppingCarts: {
    shoppingCarts: ShoppingCart[];
  };
};

export default function useShoppingCarts(branchId = 'branch1') {
  return useQuery<ShoppingCartsQueryResponse>(
    GET_SHOPPING_CARTS,
    {
      variables: {
        branchId,
      },
      skip: !branchId,
      pollInterval: 2500,
    },
  );
}
