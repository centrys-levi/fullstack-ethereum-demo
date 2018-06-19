import {createAction, handleActions} from 'redux-actions';
import {
  getWalletTransactions,
  createWallet as createWalletApi,
  topUpWallet as topUpWalletApi,
  withdrawFromWallet as withdrawFromWalletApi,
} from 'lib/explorerApi';

export const transactionsRequest = (walletAddress) => dispatch => {
  dispatch(actionCreators.startWalletTransactionsRequest());
  getWalletTransactions(walletAddress)
    .then((response) =>
      dispatch(actionCreators.successWalletTransactionsRequest(response))
    )
    .catch(() =>
      dispatch(actionCreators.failWalletTransactionsRequest())
    );
}

export const createWallet = () => dispatch => {
  dispatch(actionCreators.startCreateWalletRequest());
  createWalletApi()
    .then((response) => {
      dispatch(transactionsRequest(response.walletAddress));
      dispatch(actionCreators.successCreateWalletRequest(response))
    })
    .catch(() =>
      dispatch(actionCreators.failCreateWalletRequest())
    );
}

export const topUpWallet = (address, amount) => dispatch => {
  dispatch(actionCreators.startWalletActionRequest());
  topUpWalletApi(address, amount)
    .then((response) => {
      dispatch(actionCreators.successWalletActionRequest(response));
      dispatch(transactionsRequest(address));
    })
    .catch(() =>
      dispatch(actionCreators.failWalletActionRequest())
    );
}

export const withdrawFromWallet = (address, amount) => dispatch => {
  dispatch(actionCreators.startWalletActionRequest());
  withdrawFromWalletApi(address, amount)
    .then((response) => {
      dispatch(actionCreators.successWalletActionRequest(response));
      dispatch(transactionsRequest(address));
    })
    .catch(() =>
      dispatch(actionCreators.failWalletActionRequest())
    );
}

export const actions = {
  START_WALLET_TRANSACTIONS_REQUEST: 'START_WALLET_TRANSACTIONS_REQUEST',
  SUCCESS_WALLET_TRANSACTIONS_REQUEST: 'SUCCESS_WALLET_TRANSACTIONS_REQUEST',
  FAIL_WALLET_TRANSACTIONS_REQUEST: 'FAIL_WALLET_TRANSACTIONS_REQUEST',

  START_CREATE_WALLET_REQUEST: 'START_CREATE_WALLET_REQUEST',
  SUCCESS_CREATE_WALLET_REQUEST: 'SUCCESS_CREATE_WALLET_REQUEST',
  FAIL_CREATE_WALLET_REQUEST: 'FAIL_CREATE_WALLET_REQUEST',

  START_WALLET_ACTION_REQUEST: 'START_WALLET_ACTION_REQUEST',
  SUCCESS_WALLET_ACTION_REQUEST: 'SUCCESS_WALLET_ACTION_REQUEST',
  FAIL_WALLET_ACTION_REQUEST: 'FAIL_WALLET_ACTION_REQUEST',

  TOGGLE_TRANSACTIONS_DIALOG: 'TOGGLE_TRANSACTIONS_DIALOG',
};

export const actionCreators = {
  startWalletTransactionsRequest: createAction(actions.START_WALLET_TRANSACTIONS_REQUEST),
  successWalletTransactionsRequest: createAction(actions.SUCCESS_WALLET_TRANSACTIONS_REQUEST),
  failWalletTransactionsRequest: createAction(actions.FAIL_WALLET_TRANSACTIONS_REQUEST),

  startCreateWalletRequest: createAction(actions.START_CREATE_WALLET_REQUEST),
  successCreateWalletRequest: createAction(actions.SUCCESS_CREATE_WALLET_REQUEST),
  failCreateWalletRequest: createAction(actions.FAIL_CREATE_WALLET_REQUEST),

  startWalletActionRequest: createAction(actions.START_WALLET_ACTION_REQUEST),
  successWalletActionRequest: createAction(actions.SUCCESS_WALLET_ACTION_REQUEST),
  failWalletActionRequest: createAction(actions.FAIL_WALLET_ACTION_REQUEST),

  toggleTransactionsDialog: createAction(actions.TOGGLE_TRANSACTIONS_DIALOG),
};

const initialState = {
  isLoadingWalletTransactions: false,
  isLoadingCreateWallet: false,
  isLoadingTransactionAction: false,
  transactions: [],
  isTransactionsDialogOpen: false,
};

const handleWalletTransactionsSuccess = (state, {payload}) => {
  return {
    ...state,
    isLoadingWalletTransactions: false,
      transactions: payload
  };
};

export const walletTransactionsHandlers = handleActions({
  [actions.START_WALLET_TRANSACTIONS_REQUEST]: (state) => ({...state, isLoadingWalletTransactions: true}),
  [actions.SUCCESS_WALLET_TRANSACTIONS_REQUEST]: handleWalletTransactionsSuccess,
  [actions.FAIL_WALLET_TRANSACTIONS_REQUEST]: (state) => ({...state, isLoadingWalletTransactions: false}),

  [actions.START_CREATE_WALLET_REQUEST]: (state) => ({...state, isLoadingCreateWallet: true}),
  [actions.SUCCESS_CREATE_WALLET_REQUEST]: (state, {payload}) => ({
    ...state,
    wallet: payload,
    isLoadingCreateWallet: false
  }),
  [actions.FAIL_CREATE_WALLET_REQUEST]: (state) => ({...state, isLoadingCreateWallet: false}),

  [actions.START_WALLET_ACTION_REQUEST]: (state) => ({...state, isLoadingTransactionAction: true}),
  [actions.SUCCESS_WALLET_ACTION_REQUEST]: (state) => ({...state, isLoadingTransactionAction: false}),

  [actions.TOGGLE_TRANSACTIONS_DIALOG]: (state, { payload }) => ({
    ...state,
    isTransactionsDialogOpen: !state.isTransactionsDialogOpen,
    selectedBlock: payload || state.selectedBlock,
  }),
}, initialState);
