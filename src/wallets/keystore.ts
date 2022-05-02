import { ConnectionTypes, Wallet, walletAddresses } from "../types";
import { Chain, THORChain } from "@xchainjs/xchain-util";
import { Client as thorchainClient } from '@xchainjs/xchain-thorchain';
import { Network } from "@xchainjs/xchain-client";
import { CHAIN_IDS } from "../constants";
export class KeystoreClass implements Wallet {
  static connectionType: ConnectionTypes = ConnectionTypes.KEYSTORE;
  static iconSrc: string = 'https://img.icons8.com/ios/50/000000/key.png';
  address: walletAddresses;
  userThorchainClient: thorchainClient;

  constructor(phrase: string) {
    this.userThorchainClient = new thorchainClient({ network: Network.Testnet, phrase, chainIds: CHAIN_IDS });
    this.address = {
      [THORChain]: this.userThorchainClient.getAddress()
    };
  }

  async disconnect(): Promise<void> {
    this.userThorchainClient.purgeClient();
  }

  getAddress(chain?: Chain): walletAddresses {
    return this.address;
  }
}