const Web3 = require('web3');

class Web3Wrapper {
  constructor (blockchainUrl, password) {
    this.web3 = new Web3();
    this.web3.setProvider(new this.web3.providers.HttpProvider(blockchainUrl));
    this.accountPromise = this.web3.eth.getCoinbase();
    this.systemAccountPassword = password;
  }

  deployContract ({ compiledContract, params }) {
    return this.getSendParams().then((sendParams) => {
      const newContractInstance = new this.web3.eth.Contract(compiledContract.abi);
      return newContractInstance
        .deploy({
          data: compiledContract.bytecode,
          arguments: params
        })
        .send(sendParams);
    });
  };

  getContractInstance ({ compiledContract, address }) {
    return new this.web3.eth.Contract(compiledContract.abi, address);
  }

  executeWriteMethod (method) {
    return this.getSendParams().then((sendParams) => {
      return method.send(sendParams);
    })
  }

  getSendParams () {
    return this.accountPromise.then(account => {
      return { from: account, gas: 2000000, gasPrice: '1' };
    });
  };
}

module.exports = Web3Wrapper;
