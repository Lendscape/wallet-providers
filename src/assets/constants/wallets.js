import { useWeb3React } from "@web3-react/core";
import { walletconnect } from "./connectors";

// Wallet Logo
import walletConnect from "../img/wallets/wallet-connect.svg";
import terraWallet from "../img/wallets/terra-wallet.png";
import xdefiWallet from "../img/wallets/xdefi-wallet.png";
import keystoreWallet from "../img/wallets/keystore-wallet.svg";

// Chains Logo
import thorChain from "../img/chains/thor.svg";
import btcChain from "../img/chains/btc.png";
import ethChain from "../img/chains/eth.png";
import bnbChain from "../img/chains/bnb.svg";
import ltcChain from "../img/chains/ltc.png";
import bchChain from "../img/chains/bch.png";
// import dogeChain from "../img/chains/doge.png"
// import terraChain from "../img/chains/terra.png"

const Wallets = [
    {
        title: "XDEFI WALLET",
        description: "Connect to your XDEFI Wallet",
        logo: xdefiWallet,
        connector: "thorchain",
    },
    {
        title: "TERRA STATION",
        description: "Connect to your Terra Station Wallet",
        logo: terraWallet,
        connector: "thorchain",
    },
    {
        title: "KEYSTORE CONNECT",
        description: "Connect to your keystore Wallet",
        logo: keystoreWallet,
        connector: "thorchain",
    },
    {
        title: "WALLETCONNECT",
        description: "Connect to your WalletConnect Wallet",
        logo: walletConnect,
        connector: walletconnect,
    },
];

const Chains = [
    {
        title: "THOR",
        logo: thorChain,
        choose: true,
        network: "thorchain",
    },
    {
        title: "BTC",
        logo: btcChain,
        choose: true,
        network: "bitcoin",
    },
    {
        title: "BNB",
        logo: bnbChain,
        choose: true,
        network: "binance",
    },
    {
        title: "ETH",
        logo: ethChain,
        choose: true,
        network: "ethereum",
    },
    {
        title: "LTC",
        logo: ltcChain,
        choose: true,
        network: "litecoin",
    },
    {
        title: "BCH",
        logo: bchChain,
        choose: true,
        network: "bitcoincash",
    },
];

const ConnectedWallet = () => {
    const { connector } = useWeb3React();
    if (connector) {
        return {
            name: "WalletConnect",
            logo: walletConnect,
        };
    } else {
        return {};
    }
};

export { Wallets, Chains, ConnectedWallet };
