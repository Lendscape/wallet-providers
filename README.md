# Wallet Providers

An open-source wallet provider template for THORChain. This repository provides a template for creating a wallet provider for THORChain. There are currently 4 providers available:

-   [XDEFI wallet](https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf?hl=en)
-   [Terra Station](https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp/related)
-   [Walletconnect](https://chrome-stats.com/d/djmlnjfkgolclllleomgpgodjkmnjoec)
-   [Keystore](https://www.file-extension.info/format/keystore#:~:text=KEYSTORE%20is%20a%20file%20extension,programs%20distributed%20for%20Windows%20platform.)

## Built with

-   [React](https://reactjs.org/)
-   [terra-money](https://github.com/terra-money/wallet-provider)
-   [xchainjs](https://github.com/xchainjs/xchainjs-lib)
-   [web3-react](https://github.com/NoahZinsmeister/web3-react)

## Prerequisites

-   Node.js/NPM - You can use [NVM](https://github.com/nvm-sh/nvm) / [NVM for Windows](https://github.com/coreybutler/nvm-windows) to manage Node version installs (minimum `16.13.0`).
-   [Yarn](https://yarnpkg.com/) (optional).

## Usage

1. `npm install` or `yarn install`
2. `npm start` or `yarn start` for development running.
   [http://localhost:8080](http://localhost:3000)
3. `npm run build` or `yarn build` for live version.

## Documentation

Main directories:

-   [`src/components`](https://github.com/Lendscape/wallet-providers/tree/main/src/components)
-   [`src/assets/constants`](https://github.com/Lendscape/wallet-providers/tree/main/src/assets/constants).
-   [`src/providers`](https://github.com/Lendscape/wallet-providers/tree/main/src/providers)

Integration files:

-   For WalletConnect & Terra Station integration: [`src/components/Cwallet.js`](https://github.com/Lendscape/wallet-providers/blob/main/src/components/Cwallet.js)
-   For keystore integration: [`src/components/Keystore.js`](https://github.com/Lendscape/wallet-providers/blob/main/src/components/Keystore.js)
-   For XDEFI integration: [`src/components/Xdefi.js`](https://github.com/Lendscape/wallet-providers/blob/main/src/components/Xdefi.js)

<details>
<summary>Coding standard and example interfaces</summary>
<br />

```javascript
//keystore wallet create
const GenerateKeystore = async () => {
    const phrase = generatePhrase();
    console.log(`phrase ${phrase}`);
    const isCorrect = validatePhrase(phrase);
    console.log(`Phrase valid?: ${isCorrect}`);
    const keystore = await encryptToKeyStore(phrase, password);
    console.log(keystore, "keystore");
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(keystore)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "keystore.txt";
    link.click();
};
```

```javascript
//xdefi wallect connect function
const request = (object, method, params) => {
    console.debug({ object, method, params });
    try {
        object.request(
            {
                method,
                params: params,
            },
            (error, result) => {
                // request result handling
                console.debug("callback", error, result);
                this.lastResult = { error, result };
            }
        );
    } catch (e) {
        console.error(e);
        this.lastResult = `Error: ${e.message}`;
    }
};
```

![wallet](./src/assets/img/readme/wallet.png)
![chain](./src/assets/img/readme/chain.png)

</details>

## Contributing

1. Fork it (<https://github.com/lendscape/wallet-providers/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the `MIT` License. See `LICENSE` for more information.
