import { ConnectionTypes, Wallet, walletAddresses } from "../types";
import { Chain, THORChain } from "@xchainjs/xchain-util";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { THORChainApp } from "@thorchain/ledger-thorchain/lib/app";

export class LedgerClass implements Wallet {
  static connectionType: ConnectionTypes = ConnectionTypes.LEDGER;
  static iconSrc: string = 'https://cdn-icons-png.flaticon.com/512/2586/2586129.png';
  address: walletAddresses = {
    [Chain.THORChain]: ''
  };
  transport: any;
  app: any;
  path = [44, 931, 0, 0, 0];

  async getTransport() {
    let transport = null;

    try {
      transport = await TransportWebUSB.create();
    } catch (e) {
      console.error(e);
    }

    return transport;
  }

  async connect() {
    const transport = await this.getTransport();
    if (!transport)
      return
    const app = new THORChainApp(transport);
    const thorAddr = await app.showAddressAndPubKey(this.path, "tthor");
    this.address[Chain.THORChain] = thorAddr.bech32Address;
  }

  constructor() {

  }

  disconnect(): void {
    
  }

  getAddress(chain?: Chain): walletAddresses {
    return this.address;
  }
}