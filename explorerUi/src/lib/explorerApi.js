import { getData, postData, putData } from './dataAccess';

export const getLatestBlocks = () => getData('/blocks');
export const getLastBlockNumber = () => getData('/lastBlockNumber');
export const getWalletTransactions = (walletAddress) => getData(`/wallet/${walletAddress}/transactions`);

export const createWallet = () => postData('/wallet');
export const topUpWallet = (walletAddress, amount) =>
  putData(`/wallet/${walletAddress}`, {topUp: amount});
export const withdrawFromWallet = (walletAddress, amount) =>
  putData(`/wallet/${walletAddress}`, {withdraw: amount});
