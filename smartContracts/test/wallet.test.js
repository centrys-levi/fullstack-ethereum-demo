const { expect } = require('chai');
const Wallet = require('../wallet');
const { getRandomInt, getWeb3Wrapper } = require('./utils');

describe('wallet', function () {
  const initialFiatAmount = getRandomInt();
  let newContractInstance;
  const wallet = new Wallet(getWeb3Wrapper());

  before(function() {
    return wallet.createNewWallet({initialFiatAmount})
      .then((contract) => {
        newContractInstance = contract;
        return contract;
      });
  });

  it('should correctly initialise fields on contract creation', function () {
    return wallet.getWalletAmounts(newContractInstance.options.address).then(({fiatAmount}) => {
      expect(Number(fiatAmount)).to.equal(initialFiatAmount);
    });
  });

  it('should be possible to top up', function () {
    const amount = getRandomInt();

    return wallet.getWalletAmounts(newContractInstance.options.address).then((amounts) => {
      const amountBeforeTopUp = amounts.fiatAmount;

      return wallet.topUp(newContractInstance.options.address, amount).then(() => {
        return wallet.getWalletAmounts(newContractInstance.options.address).then(({fiatAmount}) => {
          expect(Number(fiatAmount)).to.equal(amountBeforeTopUp + amount);
        });
      });
    });
  });

  it('should be possible to withdraw', function () {
    const amount = getRandomInt();

    return wallet.getWalletAmounts(newContractInstance.options.address).then((amounts) => {
      const amountBeforeWithDrawal = amounts.fiatAmount;

      return wallet.withdraw(newContractInstance.options.address, amount).then(() => {
        return wallet.getWalletAmounts(newContractInstance.options.address).then(({fiatAmount}) => {
          expect(Number(fiatAmount)).to.equal(amountBeforeWithDrawal - amount);
        });
      });
    });
  });
});
