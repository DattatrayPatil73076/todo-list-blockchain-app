# ToDo List Blockchain Appliaction

This is Simple demo Project to Understand blockchain developement & depployment with Truffle, React and Ropsten Network.

![alt text](https://github.com/DattatrayPatil73076/todo-list-blockchain-app/blob/master/todo-list-blockchain-app.png?raw=true)

Live Here: 

## Requirements

1. required Node, NPM Installed, To Check:

```console
$ node -v
6.14.4

$ npm -v
v12.16.2
```

2. Install Truffle

```console
$ npm install -g truffle

$ truffle version
Truffle v5.1.43 (core: 5.1.43)
Solidity ^v0.5.0 (solc-js)
Node v12.16.2
Web3.js v1.2.1
```

3. Ganache-cli (Local Blockchain)

```console
$ npm install -g ganache-cli

$ ganache-cli --version
Ganache CLI v6.10.1 (ganache-core: 2.11.2)
```

5. Metamask (Blockchain Wallet to connect browser to blockchain):
   https://metamask.io

## Customizing it

Feel free to fork this project and update it with your own information and style.

If you improve the app in any way a PR would be very apreciated ;)

## Build & Run

1. Clone the repo:

```console
$ git clone https://github.com/DattatrayPatil73076/marketplace-blockchain-project
```

2. Start local blockchain with ganache-cli (keep it running until end on 127.0.0.1:8545):

```console
$ ganache-cli
```

3. Change to project directory and Install dependencies for truffle:

```console
$ cd todl-list-blockchain-app
$ npm install
```

4. Deploy solidity contracts to ganache blockchain with truffle:

```console

$ truffle migrate

```

5. As blockchain is Public Network any one in network can view th data we are storing so we need to encrypt it first i have used eth-crypto library for that, so we need to create identity,
so create file Key.json inside todo-list-client/src/utils/Key.json folder with following code (You can also create your own identity):

```console

{
  "alice": {
    "address": "0xb44A710420b4F4FA7CF478514E0771b48F2C1f7d",
    "privateKey": "0x354550f02b6eca00a130dbddbccbfbc56fefc3481e1334340a5b44b671a8b144",
    "publicKey": "f4b6f29cab3374ffbcc0ab95fa1817fc80eca144ce9aa429d833c0c69f8b5a48a8d0bf2fb555df59431916d85933ca46a4cb363f9f0e96db5dab19c85519d112"
  }
}

```

for more information : https://ethereum.stackexchange.com/questions/3092/how-to-encrypt-a-message-with-the-public-key-of-an-ethereum-address



6. Change to todo-list-client project directory and Install dependencies for react-app & Run React-APP:

```console
$ cd todo-list-client

$ npm install

$ npm start

```

7. Setup Metamask on local Ganache Blockchain & Import 3-4 Accounts
   (Default 1st account is deployer of contract) & Interact with the APP !!

## Contributing

Feel free to fork this project and customize with your personal info. If you implement any nice features or improvements I'd really appreciate if you could open a PR to this project ;)
