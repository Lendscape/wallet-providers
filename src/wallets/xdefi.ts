import { ConnectionTypes, Wallet, walletAddresses } from "../types";
import { Chain, THORChain } from "@xchainjs/xchain-util";
import { Client as thorchainClient } from '@xchainjs/xchain-thorchain';
import { Network } from "@xchainjs/xchain-client";
import { CHAIN_IDS } from "../constants";

interface windowType {
  xfi: any
}

export class XDEFIClass implements Wallet {
  static connectionType: ConnectionTypes = ConnectionTypes.XDEFI;
  static iconSrc: string = 'https://xdefi-prod-common-ui.s3.eu-west-1.amazonaws.com/logo.svg';
  address: walletAddresses = {
    [Chain.THORChain]: '',
    [Chain.Litecoin]: ''
  };
  xfiObject: any;

  isXDEFI() {
    return "xfi" in window;
  }

  constructor() {
    if(!this.isXDEFI())
      return

    this.xfiObject = (window as any).xfi;
    console.log(this.xfiObject)
  }

  async getChainAddress(chain: string, chainName: Chain) {
    return new Promise((resolve, reject) => {
      this.xfiObject[chain].request(
        {
          method: 'request_accounts',
          params: [],
        },
        (err: any, accounts: any) => {
          if (err) {
            return reject(err);
          }
          this.address[chainName] = accounts[0]
          return resolve(true);
        }
      );
    });
  }

  async connect() {
    await this.getChainAddress('litecoin', Chain.Litecoin);
    await this.getChainAddress('thorchain', Chain.THORChain);
    await this.getChainAddress('binance', Chain.Binance);
    return true;
  }

  async disconnect(): Promise<void> {
  }

  getAddress(chain?: Chain): walletAddresses {
    return this.address;
  }

  getNetwork() {
    return this.xfiObject?.thorchain?.network;
  }
}