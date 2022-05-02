import { walletAddresses } from ".";

export interface Wallet {
  address: walletAddresses;
  connect?(): void;
  disconnect(): void;
  getAddress(): walletAddresses;
}