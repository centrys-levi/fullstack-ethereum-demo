const abiDecoder = require('abi-decoder');
const walletContract = require('./solidity/build/contracts/Wallet.json');
const { convertForOutside } = require('./numberUtils');

class Explorer {
  constructor (web3) {
    this.web3 = web3;
    abiDecoder.addABI(walletContract.abi);

    this.utils = getUtilityMethods(web3);
  }

  getLastBlockNumber () {
    return this.web3.eth.getBlockNumber().then(lastBlockNumber => ({lastBlockNumber}));
  };

  getLatestBlocks (numberOfBlocksToReturn = 10) {
    return this.utils.getLatestBlocks(numberOfBlocksToReturn);
  };

  getWalletTransactions (address) {
    return this.utils.getContractTransactions(address, this.utils.decodeWalletAmounts);
  }
}

const getUtilityMethods = (web3) => {
  const getLatestBlocks = (numberOfBlocksToReturn = 10) => {
    return web3.eth.getBlockNumber().then(lastBlockNumber => {
      const blocksNumber = lastBlockNumber > numberOfBlocksToReturn ? numberOfBlocksToReturn : lastBlockNumber;
      return Promise.all(Array.apply(null, {length: blocksNumber}).map((val,index) => getBlockWithDecodedTransactions(lastBlockNumber - index)));
    });
  };

  const getContractTransactions = (contractAddress, initialValuesDecoder) => {
    // todo: current implementation is extremely inefficient
    return getLatestBlocks(1000).then(blocks =>
      Promise.all(blocks.map(block => filterContractTransactions(block, contractAddress, initialValuesDecoder))).then(blockTransactions =>
        blockTransactions
        .reduce((acc, currentTransactions) => {
            return currentTransactions[0] ? [...acc, ...currentTransactions] : acc;
          }, [])
      ));
  };

  const filterContractTransactions = (block, contractAddress, valuesDecoder) => {
    return Promise.all(block.transactions
      .map(t => ({...t, timestamp: block.timestamp}))
      .map(transaction => {
        if (transaction.to === contractAddress || transaction.from === contractAddress) {
          return valuesDecoder(transaction, contractAddress).then(amounts => {
            return {
              ...transaction,
              amounts,
            };
          });
        }

        if (transaction.to === null) { // contract creation
          return web3.eth.getTransactionReceipt(transaction.hash)
            .then(r => {
              if (r.contractAddress === contractAddress) {
                return valuesDecoder(transaction, contractAddress).then(initialValues => ({
                  ...transaction,
                  initialValues
                }));
              }
            });
        }
      })
    );
  };

  const decodeWalletAmounts = (transaction, contractAddress) =>{
    web3.eth.getStorageAt(contractAddress, 0, transaction.blockNumber)
      .then((fiatAmountHex) => ({
        fiatAmount: convertForOutside(web3.utils.hexToNumber(fiatAmountHex)),
    }));
  }

  const getBlockWithDecodedTransactions = (blockNumber) => {
    return web3.eth.getBlock(blockNumber, true).then(block => {
      return {
        ...block,
        transactions: getTransactionsWithDecodedInput(block.transactions)
      };
    });
  };

  const getTransactionsWithDecodedInput = (transactions) => {
    return transactions.map(t => {
      const decoded = abiDecoder.decodeMethod(t.input);
      if (decoded) {
        decoded.params = decoded.params.map(p => p.type === 'uint256' ? {...p, value: convertForOutside(Number(p.value)).toFixed(2)} : p);
      }

      return { ...t, decoded };
    });
  };

  return {
    getContractTransactions,
    filterContractTransactions,
    decodeWalletAmounts,
    getBlockWithDecodedTransactions,
    getTransactionsWithDecodedInput,
    getLatestBlocks,
  };
};

module.exports = Explorer;