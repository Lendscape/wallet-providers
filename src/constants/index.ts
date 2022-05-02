import { Network } from "@xchainjs/xchain-client";

export const NETWORK_TO_CHAINIDS = {
  [Network.Mainnet]: "thorchain-mainnet-v1",
  [Network.Testnet]: "thorchain-testnet-v2",
  [Network.Stagenet]: "thorchain-stagenet-v1",
};

export const CHAIN_IDS = {
  [Network.Mainnet]: "thorchain-mainnet-v1",
  [Network.Stagenet]: "thorchain-stagenet-v1",
  [Network.Testnet]: "thorchain-testnet-v2",
};
