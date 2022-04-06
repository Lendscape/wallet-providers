import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "./connectors";
import MetaMaskLogo from "../img/wallets/meta-mask.svg";
import WalletConnect from "../img/wallets/wallet-connect.svg";
import TerraWallet from "../img/wallets/terra-wallet.png";
import XdefiWallet from "../img/wallets/xdefi-wallet.png";

const Wallets = [
    {
        title: "MetaMask",
        description: "Connect to your MetaMask Wallet",
        logo: MetaMaskLogo,
        connector: injected,
    },
    {
        title: "WalletConnect",
        description: "Connect to your WalletConnect Wallet",
        logo: WalletConnect,
        connector: walletconnect,
    },
    {
        title: "TERRA STATION",
        description: "Connect to your Terra Wallet",
        logo: TerraWallet,
        connector: 'thorchain',
    },
    {
        title: "XDEFI WALLET",
        description: "Connect to your XDEFI Wallet",
        logo: XdefiWallet,
        connector: 'thorchain',
    }
];

const ConnectedWallet = () => {
    const { connector } = useWeb3React();
    if (connector) {
        switch (connector) {
            case injected: {
                return {
                    name: "MetaMask",
                    logo: MetaMaskLogo,
                };
            }
            case walletconnect: {
                return {
                    name: "WalletConnect",
                    logo: WalletConnect,
                };
            }
        }
    } else {
        return {};
    }
};

export { Wallets, ConnectedWallet };
