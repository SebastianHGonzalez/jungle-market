import {
  useCallback, useReducer, useMemo, Reducer,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import combineReducers from 'lib/combineReducers';

type Id = string;

interface Action {
  type: string;
  branch?: Branch;
  client?: Client;
}

interface ClientsState {
  byNonce: { [nonce: string]: Client };
}

interface BranchesState {
  byId: { [id: string]: Branch };
}

interface State {
  clients: ClientsState;
  branches: BranchesState;
}

interface Branch {
  id: Id;
}

interface Client {
  nonce: string;
  id?: Id;
}

interface H {
  clients: Client[];
  onClientEnters: () => void;
  onClientIdentified: (nonce: string, id: string) => void;
  onClientLeaves: (nonce: string) => void;
}

// Action types
const actionTypes = {
  clientEnteredBranch: 'branch/CLIENT_ENTERED',
  clientIdentified: 'branch/CLIENT_IDENTIFIED',
  clientLeaves: 'branch/CLIENT_LEAVES',
};

// Action creators
function clientEnteredBranch(branchId) {
  return {
    type: actionTypes.clientEnteredBranch,
    branch: {
      id: branchId,
    },
    client: {
      nonce: uuidv4(),
      id: undefined,
    },
  };
}

function clientIdentified(nonce: string, id: string) {
  return {
    type: actionTypes.clientIdentified,
    client: {
      nonce,
      id,
    },
  };
}

function clientLeaves(nonce: string) {
  return {
    type: actionTypes.clientLeaves,
    client: {
      nonce,
    },
  };
}

// Selectors
function getClients(state): Client[] {
  return Object.values(state.clients.byNonce);
}

// Reducer
function clientsByNonceReducer(state, { type, client }) {
  switch (type) {
    case actionTypes.clientEnteredBranch:
      return { ...state, [client.nonce]: client };
    case actionTypes.clientIdentified:
      return {
        ...state,
        [client.nonce]: { ...state[client.nonce], ...client },
      };
    case actionTypes.clientLeaves:
      // eslint-disable-next-line no-case-declarations
      const newState = { ...state, [client.nonce]: null };
      delete newState[client.nonce];
      return newState;
    default:
      return state;
  }
}

const clientsReducer = combineReducers({
  byNonce: clientsByNonceReducer,
});

function branchesByIdReducer(state, { type, branch, client }) {
  switch (type) {
    case actionTypes.clientEnteredBranch:
      return {
        ...state,
        [branch.id]: {
          ...state[branch.id],
          clientNonces: state[branch.id].clientNonces.concat(client.nonce),
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
  clients: clientsReducer,
  branches: branchesReducer,
}) as never;

function initializer(branchId) {
  return {
    clients: {
      byNonce: {},
    },

    branches: {
      byId: {
        [branchId]: {
          id: branchId,
          clientNonces: [],
        },
      },
    },
  };
}

// Hook
export default function useBranch(branchId): H {
  const [state, dispatch] = useReducer(reducer, branchId, initializer);

  const clients = useMemo(() => getClients(state), [state]);

  const onClientEnters = useCallback(() => {
    dispatch(clientEnteredBranch(branchId));
  }, [dispatch, branchId]);

  const onClientIdentified = useCallback((nonce, id) => {
    dispatch(clientIdentified(nonce, id));
  }, []);

  const onClientLeaves = useCallback((nonce) => {
    dispatch(clientLeaves(nonce));
  }, []);

  return {
    clients,
    onClientEnters,
    onClientIdentified,
    onClientLeaves,
  };
}
