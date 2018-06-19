import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { blocksHandlers as blocks } from './blocks';
import { walletTransactionsHandlers as wallet } from './wallet';

const reducers = combineReducers({
  blocks,
  wallet,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
