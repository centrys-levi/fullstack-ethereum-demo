const compiledContract = require('./solidity/build/contracts/Wallet.json');
const { convertForEthereum, convertForOutside } = require('./numberUtils');

class Wallet {
  constructor (web3Wrapper) {
    this.web3Wrapper = web3Wrapper;
  }

  createNewWallet ({initialFiatAmount = 0}) {
    return this.web3Wrapper.deployContract({
      compiledContract,
      params: [convertForEthereum(initialFiatAmount)]
    });
  }

  getWalletAmounts (address) {
    const contractInstance = this.web3Wrapper.getContractInstance({compiledContract, address});

    return contractInstance.methods.fiatAmount().call()
      .then((fiatAmount) => ({
        fiatAmount: convertForOutside(fiatAmount)
      }));
  }

  topUp (address, amount) {
    const contractInstance = this.web3Wrapper.getContractInstance({compiledContract, address});
    return this.web3Wrapper.executeWriteMethod(contractInstance.methods.topUp(convertForEthereum(amount)));
  }

  withdraw (address, amount) {
    const contractInstance = this.web3Wrapper.getContractInstance({compiledContract, address});
    return this.web3Wrapper.executeWriteMethod(contractInstance.methods.withdraw(convertForEthereum(amount)));
  }
}

module.exports = Wallet;
