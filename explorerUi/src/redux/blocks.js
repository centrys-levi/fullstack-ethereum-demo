import {createAction, handleActions} from 'redux-actions';
import { getLatestBlocks, getLastBlockNumber } from 'lib/explorerApi';

export const latestBlocksRequest = () => {
  return dispatch => {
    dispatch(actionCreators.startBlocksRequest());
    getLatestBlocks()
      .then((response) => {
        dispatch(actionCreators.successBlocksRequest(response));
      })
      .catch(() => {
        dispatch(actionCreators.failBlocksRequest())
      });
  }
};

export const initBlocksPolling = () => {
  return dispatch => {
    const latestBlocksLoop = () => {
      getLatestBlocks()
        .then((latestBlocks) => {
          dispatch(actionCreators.successBlocksRequest(latestBlocks));
          lastBlockNumberLoop(latestBlocks);
        })
        .catch(() => {
          dispatch(actionCreators.failBlocksRequest())
        });
    }

    const lastBlockNumberLoop = (latestBlocks) => {
      setTimeout(() => {
        getLastBlockNumber()
        .then((response) => {
          if (latestBlocks.length === 0 || response.lastBlockNumber > latestBlocks[0].number) {
            latestBlocksLoop();
          } else {
            lastBlockNumberLoop(latestBlocks);
          }
        });
      }, 1000);
    }

    dispatch(actionCreators.startBlocksRequest());
    latestBlocksLoop(dispatch);
  }
}

const getNumberOfBlocksPerDay = (blocks) => {
  const grouping = blocks.reduce((acc, block) => {
    const date = new Date(block.timestamp * 1000).toLocaleDateString();
    return {
      ...acc,
      [date]: acc[date] ? acc[date] + 1 : 1,
      total: acc.total + 1
    };
  }, {total: 0});
  return (grouping.total / Object.keys(grouping).length).toFixed(1);
};

const getAverageTransactionsPerBlock = (blocks) => {
  const totalTransactions = blocks.reduce((acc, b) => acc + b.transactions.length, 0);

  return blocks.length > 0 ? (totalTransactions / blocks.length).toFixed(2) : 0;
}

export const actions = {
  START_BLOCKS_REQUEST: 'START_BLOCKS_REQUEST',
  SUCCESS_BLOCKS_REQUEST: 'SUCCESS_BLOCKS_REQUEST',
  FAIL_BLOCKS_REQUEST: 'FAIL_BLOCKS_REQUEST',
};

export const actionCreators = {
  startBlocksRequest: createAction(actions.START_BLOCKS_REQUEST),
  successBlocksRequest: createAction(actions.SUCCESS_BLOCKS_REQUEST),
  failBlocksRequest: createAction(actions.FAIL_BLOCKS_REQUEST),
};

const initialState = {
  isLoadingBlocks: false,
  latestBlocks: [],
  numberOfBlocksPerDay: 0,
};

const handleBlocksSuccess = (state, {payload}) => {
  return {
    ...state,
    isLoadingBlocks: false,
    latestBlocks: payload,
    numberOfBlocksPerDay: getNumberOfBlocksPerDay(payload),
    averageTransactionsPerBlock: getAverageTransactionsPerBlock(payload),
  };
};

export const blocksHandlers = handleActions({
  [actions.START_BLOCKS_REQUEST]: (state) => ({...state, isLoadingBlocks: true}),
  [actions.SUCCESS_BLOCKS_REQUEST]: handleBlocksSuccess,
  [actions.FAIL_BLOCKS_REQUEST]: (state) => ({...state, isLoadingBlocks: false}),
}, initialState);
