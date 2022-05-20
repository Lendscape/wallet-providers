import { KeystoreClass } from "./keystore";
import { AppDispatch, RootState } from "../store";
import { addWallet } from "../store/wallets";
import { ConnectionTypes } from "../types";
import { generatePhrase } from '@xchainjs/xchain-crypto';
import { XDEFIClass } from "./xdefi";
import { useWallet, ConnectType, useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Chain } from "@xchainjs/xchain-util";
import { LedgerClass } from "./ledger";
import { changeAlert, close, open } from "../store/alert";

const WalletsProviders = () => {
  const { connect, availableConnections } = useWallet();
  const wallet = useConnectedWallet();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(!wallet)
      return
    dispatch(addWallet({
      address: {[Chain.Terra]: wallet?.terraAddress},
      client: wallet,
      type: wallet?.connectType,
      network: wallet?.network.name
    }))
  }, [wallet?.network.name, wallet?.terraAddress]);

  const terraWallets = availableConnections
    .filter(({ type }) => type !== (ConnectType.READONLY))
    .map(({ type, icon, name, identifier }) => ({
      type,
      name,
      icon,
      connect: (dispatch: AppDispatch) => {
        connect(type, identifier);
      }
    }))
  
  return [
    {
      name: 'Create new Keystore',
      icon: KeystoreClass.iconSrc,
      type: KeystoreClass.connectionType,
      connect: (dispatch: AppDispatch) => {
        const phrase = generatePhrase();
        const thorClient = new KeystoreClass(phrase);
        dispatch(addWallet({
          address: thorClient.getAddress(),
          client: thorClient,
          type: KeystoreClass.connectionType,
          network: 'testnet'
        }))
      }
    },
    {
      name: 'Connect XDEFI',
      icon: XDEFIClass.iconSrc,
      type: XDEFIClass.connectionType,
      connect: async (dispatch: AppDispatch) => {
        const xdefiClient = new XDEFIClass();
        await xdefiClient.connect()
        console.log(xdefiClient.getNetwork())
        dispatch(addWallet({
          address: xdefiClient.getAddress(),
          client: xdefiClient,
          type: XDEFIClass.connectionType,
          network: xdefiClient.getNetwork()
        }))
      }
    },
    {
      name: 'Ledger',
      icon: LedgerClass.iconSrc,
      type: LedgerClass.connectionType,
      connect: async (dispatch: AppDispatch) => {
        const ledgerClient = new LedgerClass();
        try {
          dispatch(changeAlert({
            isOn: true,
            message: 'Accept your address in the ledger.'
          }));
          await ledgerClient.connect();
          dispatch(close());
          dispatch(addWallet({
            address: ledgerClient.getAddress(),
            client: ledgerClient,
            type: LedgerClass.connectionType,
            network: 'testnet'
          }))
        }
        catch (e: any) {
          dispatch(changeAlert({
            isOn: true,
            message: `${e.message}`,
            status: 'error'
          }));
          console.log(e)
        }
      }
    },
    ...terraWallets
  ]
}

export const walletImport = {
  name: 'Import Keystore',
  icon: 'https://img.icons8.com/ios-filled/50/000000/add--v1.png',
  type: KeystoreClass.connectionType,
  connect: (dispatch: AppDispatch, phrase: string) => {
    const thorClient = new KeystoreClass(phrase);
    dispatch(addWallet({
      address: thorClient.getAddress(),
      client: thorClient,
      type: ConnectionTypes.KEYSTORE
    }))
  }
}

export default WalletsProviders;