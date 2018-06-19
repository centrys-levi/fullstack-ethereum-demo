const Web3Wrapper = require('../web3Wrapper');

module.exports = {
  getRandomInt: (max = 1000) => Math.floor(Math.random() * Math.floor(max)),
  getWeb3Wrapper: () =>
    new Web3Wrapper('http://localhost:7545'),
}
