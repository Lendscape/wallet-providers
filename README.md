# Lendscape wallet-providers

## Description 
We have made this wallet-providers project for connection to Thorchain. <br />
This provides [Xdefi wallet](https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf?hl=en),[Terra wallet](https://chrome.google.com/webstore/detail/terra-station-wallet/aiifbnbfobpmeekipheeijimdpnlpgpp/related),[Walletconnect](https://chrome-stats.com/d/djmlnjfkgolclllleomgpgodjkmnjoec), [Keystore Connect](https://www.file-extension.info/format/keystore#:~:text=KEYSTORE%20is%20a%20file%20extension,programs%20distributed%20for%20Windows%20platform.) for Thorchain connection.<br />.
All developers that don't know about Thorchain well can use without problems.<br />

## Requisites
- Node.js/NPM - You can use [NVM](https://github.com/nvm-sh/nvm) / [NVM for Windows](https://github.com/coreybutler/nvm-windows) to manage Node version installs (minimum `16.13.0`).
- Yarn (optional)

## How to Install and Run the Project
1. `npm install` or `yarn install`
2. `npm start` or `yarn start` for development running.[http://localhost:8080](http://localhost:3000)
3. `npm run build` or `yarn build` for live version.

## Stack
 react

## Library
We have used :<br />
    -for Xdefi wallet, xdefi wallect connect sdk(especially it is possible to connect to multichains)<br />
    -for Terra wallet, [@terra-money/wallet-provider](https://www.npmjs.com/package/@terra-money/wallet-provider)<br />
    -for Walletconnect, [@web3-react/walletconnect-connector](npmjs.com/package/@web3-react/walletconnect-connector)<br />
    -for keystore, [xchainjs library](https://github.com/xchainjs/xchainjs-lib)<br />

## How to Use this
 you can customise [src/compnents](https://github.com/Lendscape/wallet-providers/tree/dev/src/components) and [src/assets/constants](https:// github.com/Lendscape/wallet-providers/tree/dev/src/assets/constants). <br />
 [components/Cwallet.js](https://github.com/Lendscape/wallet-providers/blob/dev/src/components/Cwallet.js) is included wallectConnect and Terra wallect connection.<br />
 [components/Keystore.js](https://github.com/Lendscape/wallet-providers/blob/dev/src/components/Keystore.js) is included Keystore wallet connection. <br />
 ```javascript
    //keystore wallet create
    const GenerateKeystore = async () => {
        const phrase = generatePhrase() 
        console.log(`phrase ${phrase}`)
        const isCorrect = validatePhrase(phrase)
        console.log(`Phrase valid?: ${isCorrect}`)
        const keystore = await encryptToKeyStore(phrase, password)
        console.log(keystore, "keystore")
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(keystore)
            )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "keystore.txt";
        link.click();
    }
```
 [components/Xdefi.js](https://github.com/Lendscape/wallet-providers/blob/dev/src/components/Xdefi.js) is included Xdefi wallet connection.
 <br />
 Especially, xdefi provides multichain connections.<br />
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
    }
```
## Some interfaces
<img src="src/assets/img/readme/wallet.png"></img><br/>
<img src="src/assets/img/readme/chain.png"></img>
