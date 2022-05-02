import { Chain } from '@xchainjs/xchain-util';

export * from './wallet';

export enum ConnectionTypes {
  XDEFI = "XDEFI",
  KEYSTORE = "KEYSTORE",
  WC = "WALLETCONNECT",
}

export type walletAddresses = Partial<Record<Chain, string>>;
