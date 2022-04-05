import Web3 from "web3";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import detectEthereumProvider from '@metamask/detect-provider'
import {
  HOME_CONNECT_WALLET_BEGIN,
  HOME_CONNECT_WALLET_SUCCESS,
  HOME_CONNECT_WALLET_FAILURE,
  HOME_ACCOUNTS_CHANGED,
  HOME_NETWORK_CHANGED
} from "../redux/constants";
import { disconnectWallet } from "./actions";
import { nodes } from './getRpcUrl'
import config from '../config'

export function connectWallet(web3Modal) {
  setupNetwork()
  return async (dispatch) => {
    dispatch({ type: HOME_CONNECT_WALLET_BEGIN });
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      web3.eth.extend({
        methods: [
          {
            name: "chainId",
            call: "eth_chainId",
            outputFormatter: web3.utils.hexToNumber
          }
        ]
      });
      const subscribeProvider = (provider) => {
        if (!provider.on) {
          return;
        }
        provider.on("close", () => {
          dispatch(disconnectWallet(web3, web3Modal));
        });
        provider.on("disconnect", async () => {
          dispatch(disconnectWallet(web3, web3Modal));
        });
        provider.on("accountsChanged", async (accounts) => {
          if (accounts[0]) {
            dispatch({ type: HOME_ACCOUNTS_CHANGED, data: accounts[0] });
          } else {
            dispatch(disconnectWallet(web3, web3Modal));
          }
        });
        provider.on("chainChanged", async (chainId) => {
          const networkId = web3.utils.isHex(chainId)
            ? web3.utils.hexToNumber(chainId)
            : chainId;
          dispatch({ type: HOME_NETWORK_CHANGED, data: networkId });
        });
      };
      subscribeProvider(provider);

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      let networkId = await web3.eth.getChainId();
      if (networkId === 86) {
        // Trust provider returns an incorrect chainId for BSC.
        networkId = 56;
      }
      
      dispatch({
        type: HOME_CONNECT_WALLET_SUCCESS,
        data: { web3, address, networkId }
      });
    } catch (error) {
      console.log(error)
      dispatch({ type: HOME_CONNECT_WALLET_FAILURE });
    }
  };
}

export function useConnectWallet() {
  const dispatch = useDispatch();
  const {
    web3,
    address,
    networkId,
    connected,
    connectWalletPending
  } = useSelector(
    (state) => ({
      web3: state.houseNft.web3,
      address: state.houseNft.address,
      networkId: state.houseNft.networkId,
      connected: state.houseNft.connected,
      connectWalletPending: state.houseNft.connectWalletPending
    }),
    shallowEqual
  );
  const boundAction = useCallback((data) => dispatch(connectWallet(data)), [
    dispatch
  ]);

  return {
    web3,
    address,
    networkId,
    connected,
    connectWalletPending,
    connectWallet: boundAction
  };
}

export const setupNetwork = async () => {
  let provider = window.ethereum
  if (!provider) {
    provider = await detectEthereumProvider()
  }
  if (provider) {
    const chainId = config.CHAIN_ID
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: config.CHAIN_NAME,
            nativeCurrency: {
              name: config.CURRENCY,
              symbol: config.CURRENCY,
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: [`${config.EXPLORER}`],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      // console.error(error)
      return false
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    )
    return false
  }
}
