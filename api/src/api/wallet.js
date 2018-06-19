export default (router, walletService) => {
  // POST /api/wallet
  // {"fiatAmount": 123}
  router.post('/wallet', (req, res) => {
    const wallet = req.body;
    walletService.createNewWallet({
      initialFiatAmount: wallet.fiatAmount || 0
    }).then(receipt => res.send({walletAddress: receipt.options.address}));
  });

  // PUT /api/wallet/0x0711AaAdCC073f1eC3579F89Ac3B7f6049759902
  // {"topUp": 123, "withdraw" : 321}
  router.put('/wallet/:address', (req, res) => {
    const wallet = req.body;
    const address = req.params.address;

    const topUp = wallet.topUp ? Number(wallet.topUp).toFixed(2) : 0;
    const withdraw = wallet.withdraw ? Number(wallet.withdraw).toFixed(2) : 0;

    Promise.all([
      topUp ? walletService.topUp(address, wallet.topUp) : true,
      withdraw ? walletService.withdraw(address, wallet.withdraw) : true
    ]).then(() => res.status(204).end());
  });

  // GET /api/wallet/0x0711AaAdCC073f1eC3579F89Ac3B7f6049759902
  router.get('/wallet/:address', (req, res) => {
    walletService.getWalletAmounts(req.params.address).then(res.send.bind(res));
  });
}
