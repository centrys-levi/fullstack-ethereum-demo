export default (router, explorerService) => {
  router.get('/blocks', (req, res) => {
    explorerService.getLatestBlocks(25).then(res.send.bind(res));
  });

  router.get('/lastBlockNumber', (req, res) => {
    explorerService.getLastBlockNumber().then(res.send.bind(res));
  });

  router.get('/wallet/:address/transactions', (req, res) => {
    explorerService.getWalletTransactions(req.params.address).then(res.send.bind(res));
  });
};
