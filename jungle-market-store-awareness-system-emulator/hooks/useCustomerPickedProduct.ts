import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const CUSTOMER_PICKED_PRODUCT = gql`
  mutation customerPickedProduct($customerId: String!, $skuId: String!) {
    customerPickedProduct(customerId: $customerId, skuId: $skuId) {
      customerId
      skuId
    }
  }
`;

export default function useCustomerPickedProduct() {
  return useMutation(CUSTOMER_PICKED_PRODUCT);
}
