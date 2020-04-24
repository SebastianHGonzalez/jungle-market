import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_SHOPPING_CARTS = gql`
  query getShoppingCarts {
    shoppingCarts(branchId: "branch1") {
      shoppingCarts {
        branch {
          id
        }
        customer {
          id
        }
        products {
          count
          sku {
            id
          }
        }
      }
    }
  }
`;

type ShoppingCartsQueryResponse = {
  shoppingCarts: {
    branch?: string;
    customer: {
      id: string;
    };
    products: [
      {
        count: number;
        sku: {
          id: string;
        };
      }
    ];
  }[];
};

export default function useShoppingCarts() {
  return useQuery<ShoppingCartsQueryResponse>(GET_SHOPPING_CARTS);
}
