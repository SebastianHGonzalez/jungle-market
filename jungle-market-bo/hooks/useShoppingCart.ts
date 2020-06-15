import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { ShoppingCart, ID } from 'model';

const GET_SHOPPING_CART = gql`
  query getShoppingCarts($shoppingCartId: ID!) {
    shoppingCart(id: $shoppingCartId) {
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
`;

type ShoppingCartQueryResponse = {
  shoppingCart: ShoppingCart;
};

export default function useShoppingCart(shoppingCartId: ID) {
  return useQuery<ShoppingCartQueryResponse>(
    GET_SHOPPING_CART,
    {
      variables: {
        shoppingCartId,
      },
      skip: !shoppingCartId,
    },
  );
}
