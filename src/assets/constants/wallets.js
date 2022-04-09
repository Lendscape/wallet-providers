import { useWeb3React } from "@web3-react/core";
import { walletconnect } from "./connectors";

//wallet logo
import WalletConnect from "../img/wallets/wallet-connect.svg";
import TerraWallet from "../img/wallets/terra-wallet.png";
import XdefiWallet from "../img/wallets/xdefi-wallet.png";
import KeystoreWallet from "../img/wallets/keystore-wallet.svg";

//chain logo
import ThorChain from "../img/chains/thorchain.svg"
import TerraChain from "../img/chains/terrachain.png"
import BtcChain from "../img/chains/btcchain.png"
import EthChain from "../img/chains/ethchain.png"
import BnbChain from "../img/chains/bnbchain.svg"
import DogeChain from "../img/chains/dogechain.png"
import LtcChain from "../img/chains/ltcchain.png"
import BchChain from "../img/chains/bchchain.png"

const Wallets = [
    {
        title: "XDEFI WALLET",
        description: "Connect to your Xdefi Wallet",
        logo: XdefiWallet,
        connector: 'thorchain',
    },
    {
        title: "TERRA STATION",
        description: "Connect to your Terra Wallet",
        logo: TerraWallet,
        connector: 'thorchain',
    },
    {
        title: "KEYSTORE CONNECT",
        description: "Connect to your keystore Wallet",
        logo: KeystoreWallet,
        connector: 'thorchain',
    },
    {
        title: "WALLETCONNECT",
        description: "Connect to your WalletConnect Wallet",
        logo: WalletConnect,
        connector: walletconnect,
    },
];

const Chains = [
    {
        title : "THOR",
        logo : ThorChain,
        choose : true,
        network: "thorchain"
    },
    {
        title : "BTC",
        logo : BtcChain,
        choose : true,
        network: "bitcoin"
    },
    {
        title : "BNB",
        logo : BnbChain,
        choose : true,
        network: "binance"
    },
    // {
    //     title : "DOGE",
    //     logo : DogeChain,
    //     choose : true,
    //     network : "dogecoin"
    // },
    {
        title : "LTC",
        logo : LtcChain,
        choose : true,
        network : "litecoin"
    },
    {
        title : "BCG",
        logo : BchChain,
        choose : true,
        network : "bitcoincash"
    },
]

const ConnectedWallet = () => {
    const { connector } = useWeb3React();
    if (connector) {
        return {
            name: "WalletConnect",
            logo: WalletConnect,
        };
    } else {
        return {};
    }
};

export { Wallets,Chains, ConnectedWallet };
