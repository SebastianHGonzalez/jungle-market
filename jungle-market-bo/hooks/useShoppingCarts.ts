import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_SHOPPING_CARTS = gql`
  query getShoppingCarts {
    shoppingCarts(branchId: "branch1") {
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

type ShoppingCartsQueryResponse = {
  shoppingCarts: {
    shoppingCarts: {
      branch: {
        id: string;
        cname: string;
      };
      customer: {
        id: string;
        nonce: string;
        fullName: string;
      };
      products: [
        {
          count: number;
          sku: {
            id: string;
            shortName: string;
          };
        }
      ];
      state: string;
    }[];
  };
};

export default function useShoppingCarts() {
  return useQuery<ShoppingCartsQueryResponse>(GET_SHOPPING_CARTS);
}
