import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectionTypes, Wallet, walletAddresses } from '../types'
import { ConnectedWallet, ConnectType } from "@terra-money/wallet-provider";

export interface WalletStorage {
  type: ConnectionTypes | ConnectType | undefined,
  address: walletAddresses,
  client: Wallet | ConnectedWallet | undefined, //this is the wallet class
  network?: string
}

const initialState: WalletStorage[] = [];

export const walletSlice = createSlice({
  name: 'walletStorages',
  initialState,
  reducers: {
    addWallet(state: Array<WalletStorage>, action: PayloadAction<{address: walletAddresses, client: Wallet | ConnectedWallet | undefined, type: ConnectionTypes | ConnectType | undefined, network?: string}>) {
      state.push({
        type: action.payload.type,
        address: action.payload.address,
        client: action.payload.client,
        ...(action.payload.network && {network: action.payload.network})
      })
    },
    removeWallet(state: Array<WalletStorage>, action: PayloadAction<ConnectionTypes|ConnectType>) {
      state = state.filter(e => e.type !== action.payload)
    }
  },
})

export const { addWallet, removeWallet } = walletSlice.actions

export default walletSlice.reducer