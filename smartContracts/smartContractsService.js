const Wallet = require('./wallet');
const Web3Wrapper = require('./web3Wrapper');
const Explorer = require('./explorer');

class SmartContractsService {
  constructor (blockchainUrl) {
    const web3Wrapper = new Web3Wrapper(blockchainUrl);
    this.wallet = new Wallet(web3Wrapper);
    this.explorer = new Explorer(web3Wrapper.web3);
  }
}

module.exports = SmartContractsService;
