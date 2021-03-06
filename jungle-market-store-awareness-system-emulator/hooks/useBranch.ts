import {
  useCallback, useReducer, useMemo, Reducer,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import combineReducers from 'lib/combineReducers';

type Id = string;

interface Action {
  type: string;
  branch?: Branch;
  customer?: Customer;
}

interface CustomersState {
  byNonce: { [nonce: string]: Customer };
}

interface BranchesState {
  byId: { [id: string]: Branch };
}

interface State {
  customers: CustomersState;
  branches: BranchesState;
}

interface Branch {
  id: Id;
}

interface Customer {
  nonce: string;
  id?: Id;
}

interface ShoppingCart {
  [skuId: string]: number;
}

interface H {
  customers: { [nonce: string]: Customer };
  shoppingCarts: { [customerNonce: string]: ShoppingCart };

  onCustomerEnters: () => void;
  onCustomerIdentified: (nonce: string, id: string) => void;
  onCustomerPickedProduct: (nonce: string, skuId: string) => void;
  onCustomerLeaves: (nonce: string) => void;
}

// Action types
const actionTypes = {
  customerEnteredBranch: 'branch/CUSTOMER_ENTERED',
  customerIdentified: 'branch/CUSTOMER_IDENTIFIED',
  customerPickedProduct: 'branch/CUSTOMER_PICKED_PRODUCT',
  customerLeaves: 'branch/CUSTOMER_LEAVES',
};

// Action creators
function customerEnteredBranch(branchId, nonce) {
  return {
    type: actionTypes.customerEnteredBranch,
    branch: {
      id: branchId,
    },
    customer: {
      nonce,
    },
  };
}

function customerIdentified(nonce: string, id: string) {
  return {
    type: actionTypes.customerIdentified,
    customer: {
      nonce,
      id,
    },
  };
}

function customerPickedProduct(nonce: string, skuId: string) {
  return {
    type: actionTypes.customerPickedProduct,
    customer: {
      nonce,
    },
    sku: {
      id: skuId,
    },
  };
}

function customerLeaves(nonce: string) {
  return {
    type: actionTypes.customerLeaves,
    customer: {
      nonce,
    },
  };
}

// Selectors
function getCustomers(state): { [nonce: string]: Customer } {
  return state.customers.byNonce;
}

function getShoppingCarts(state): { [customerNonce: string]: ShoppingCart } {
  return state.shoppingCarts.byCustomerNonce;
}

// Reducer
function shoppingCartReducer(state, { type, sku }) {
  switch (type) {
    case actionTypes.customerPickedProduct:
      return { ...state, [sku.id]: (state[sku.id] || 0) + 1 };
    default:
      return state;
  }
}

function shoppingCartsByCustomerNonceReducer(state, action) {
  const { type, customer } = action;
  switch (type) {
    case actionTypes.customerEnteredBranch:
      return {
        ...state,
        [customer.nonce]: {},
      };

    case actionTypes.customerPickedProduct:
      return {
        ...state,
        [customer.nonce]: shoppingCartReducer(state[customer.nonce], action),
      };
    default:
      return state;
  }
}

const shoppingCartsReducer = combineReducers({
  byCustomerNonce: shoppingCartsByCustomerNonceReducer,
});

function customersByNonceReducer(state, { type, customer }) {
  switch (type) {
    case actionTypes.customerEnteredBranch:
      return { ...state, [customer.nonce]: customer };
    case actionTypes.customerIdentified:
      return {
        ...state,
        [customer.nonce]: { ...state[customer.nonce], ...customer },
      };
    case actionTypes.customerLeaves:
      // eslint-disable-next-line no-case-declarations
      const newState = { ...state, [customer.nonce]: null };
      delete newState[customer.nonce];
      return newState;
    default:
      return state;
  }
}

const customersReducer = combineReducers({
  byNonce: customersByNonceReducer,
});

function branchesByIdReducer(state, { type, branch, customer }) {
  switch (type) {
    case actionTypes.customerEnteredBranch:
      return {
        ...state,
        [branch.id]: {
          ...state[branch.id],
          customerNonces: state[branch.id].customerNonces.concat(
            customer.nonce,
          ),
        },
      };
    default:
      return state;
  }
}

const branchesReducer = combineReducers({
  byId: branchesByIdReducer,
});

const reducer: Reducer<State, Action> = combineReducers({
  shoppingCarts: shoppingCartsReducer,
  customers: customersReducer,
  branches: branchesReducer,
}) as never;

function initializer(branchId) {
  return {
    customers: {
      byNonce: {},
    },

    branches: {
      byId: {
        [branchId]: {
          id: branchId,
          customerNonces: [],
        },
      },
    },

    shoppingCarts: {
      byCustomerNonce: {},
    },
  };
}

// Mutations
const CUSTOMER_ENTERS_BRANCH = gql`
  mutation customerEntersBranch($customerNonce: ID!, $branchId: ID!) {
    customerEntersBranch(customerNonce: $customerNonce, branchId: $branchId) {
      customerNonce
      branchId
    }
  }
`;

const CUSTOMER_IDENTIFIED = gql`
  mutation customerIdentified($customerNonce: ID!, $customerId: ID!) {
    customerIdentified(customerNonce: $customerNonce, customerId: $customerId) {
      customerNonce
      customerId
    }
  }
`;

const CUSTOMER_PICKED_PRODUCT = gql`
  mutation customerPickedProduct($customerNonce: ID!, $skuId: ID!) {
    customerPickedProduct(customerNonce: $customerNonce, skuId: $skuId) {
      customerNonce
      skuId
    }
  }
`;

const CUSTOMER_LEAVES = gql`
  mutation customerLeaves($customerNonce: ID!) {
    customerLeaves(customerNonce: $customerNonce) {
      customerNonce
    }
  }
`;

// Hook
export default function useBranch(branchId): H {
  // Server mutations
  const [execCustomerEntersBranch] = useMutation(CUSTOMER_ENTERS_BRANCH);
  const [execCustomerIdentified] = useMutation(CUSTOMER_IDENTIFIED);
  const [execCustomerPickedProduct] = useMutation(CUSTOMER_PICKED_PRODUCT);
  const [execCustomerLeaves] = useMutation(CUSTOMER_LEAVES);

  // Internal state
  const [state, dispatch] = useReducer(reducer, branchId, initializer);

  const customers = useMemo(() => getCustomers(state), [state]);
  const shoppingCarts = useMemo(() => getShoppingCarts(state), [state]);

  // Callbacks
  const onCustomerEnters = useCallback(() => {
    const customerNonce = uuidv4();
    dispatch(customerEnteredBranch(branchId, customerNonce));
    execCustomerEntersBranch({ variables: { customerNonce, branchId } });
  }, [dispatch, branchId]);

  const onCustomerIdentified = useCallback((customerNonce, customerId) => {
    dispatch(customerIdentified(customerNonce, customerId));
    execCustomerIdentified({ variables: { customerNonce, customerId } });
  }, []);

  const onCustomerPickedProduct = useCallback((customerNonce, skuId) => {
    dispatch(customerPickedProduct(customerNonce, skuId));
    execCustomerPickedProduct({ variables: { customerNonce, skuId } });
  }, []);

  const onCustomerLeaves = useCallback((customerNonce) => {
    dispatch(customerLeaves(customerNonce));
    execCustomerLeaves({ variables: { customerNonce } });
  }, []);

  return {
    customers,
    shoppingCarts,
    onCustomerEnters,
    onCustomerIdentified,
    onCustomerPickedProduct,
    onCustomerLeaves,
  };
}
