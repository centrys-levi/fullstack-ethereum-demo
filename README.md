# Full stack ethereum demo app
The purpose of this demo application is to provide some insight into how a full stack app
on top of Ethereum smart contract can be built.

# Setup
## Smart Contracts
You must have truffle installed in order to compile the contracts
```bash
npm install -g truffle
cd smartContracts/solidity
truffle compile
```

Note: the built contracts are under source control so this step is needed only if you modify the .sol files.

The demo is built around a locally running ethereum node.
The suggested way of doing this is using [ganache](http://truffleframework.com/ganache/).

## Api
A Node.js Express based http api.

```bash
cd api
npm install
npm start
```

Make sure the `api/src/config.json` file contains the correct url to your ethereum node.

## UI
React based app.

```bash
cd explorerUi
npm install
npm start
```

Open your browser (it's also done automatically when starting the UI project) on localhost:3000 and you should be able to interact with the app.