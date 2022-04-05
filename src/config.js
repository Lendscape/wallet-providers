
export const connectorNames = {
    Injected: 'Injected',
    BSC: 'bsc',
    Polygon: 'PolygonNetwork',
    WalletConnect: 'WalletConnect',
}

export const POLLING_INTERVAL = 12000

const config = {
    'development': {
        CHAIN_NAME: "Polygon Testnet",
        CHAIN_ID: 80001,
        CURRENCY: "MATIC",
        EXPLORER: "https://mumbai.polygonscan.com/",
        WEBSOCKET_1: "wss://mumbai-dagger.matic.today",
        RPC_URL_1: "https://matic-mumbai.chainstacklabs.com",
        RPC_URL_2: "https://rpc-mumbai.maticvigil.com",
        RPC_URL_3: "https://matic-testnet-archive-rpc.bwarelabs.com",
    },
    'production': {
        CHAIN_NAME: "Polygon Mainnet",
        CHAIN_ID: 137,
        CURRENCY: "MATIC",
        EXPLORER: "https://polygonscan.com/",
        WEBSOCKET: "wss://rpc-mainnet.matic.network",
        RPC_URL_1: "https://matic-mainnet.chainstacklabs.com",
        RPC_URL_2: "https://rpc-mainnet.maticvigil.com",
        RPC_URL_3: "https://rpc-mainnet.matic.quiknode.pro",
    }
}

export default config['development'];