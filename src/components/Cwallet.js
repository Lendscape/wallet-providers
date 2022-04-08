import React, { useState, useEffect } from "react";
import Keystore from "./Keystore";

// ** Web3 React
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useWallet } from '@terra-money/wallet-provider';
import { generatePhrase, validatePhrase, encryptToKeyStore, decryptFromKeystore } from "@xchainjs/xchain-crypto"
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";

import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
// Import Material UI Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

// Import Assets
import useStyles from "../assets/constants/styles";
import { Wallets, ConnectedWallet } from "../assets/constants/wallets";

// Import Icons
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from '@mui/icons-material/Replay';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';

import { walletconnect } from "../assets/constants/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { bech32 } from 'bech32'
import crypto from 'crypto'
import hexEncoding from 'crypto-js/enc-hex'
import ripemd160 from 'crypto-js/ripemd160'
import sha256 from 'crypto-js/sha256'
import * as bip39 from 'bip39'
import { blake256 } from 'foundry-primitives'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

const Cwallet = ({ isOpen, setIsOpen }) => {
    const classes = useStyles();
    const triedEager = useEagerConnect();

    const {
        status,
        network,
        wallets,
        availableConnectTypes,
        availableInstallTypes,
        availableConnections,
        supportFeatures,
        connect,
        install,
        disconnect,
    } = useWallet();

    const {
        activate,
        active,
        account,
        deactivate,
        connector,
        error,
        setError,
    } = useWeb3React();

    const [activatingConnector, setActivatingConnector] = useState(false);
    const [isSelectingWallet, setIsSelectingWallet] = useState(true);
    const [keystoreConnector, setKeystoreConnector] = useState(false);
    const cWallet = ConnectedWallet();
    
    // ** Effects
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    const request = (object, method, params) => {
        console.debug({ object, method, params });
        try {
          object.request(
            {
              method,
              params: params,
            },
            (error, result) => {
              // request result handling
              console.debug("callback", error, result);
              this.lastResult = { error, result };
            }
          );
        } catch (e) {
          console.error(e);
          this.lastResult = `Error: ${e.message}`;
        }
      }
    // log the walletconnect URI
    useEffect(() => {
        const logURI = (uri) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);
    useInactiveListener(!triedEager);
    // ** Actions
    const onConnectWallet = async (item) => {
        setActivatingConnector(item.connector);
        setIsSelectingWallet(false);
        sessionStorage.close = false;
        await activate(item.connector);
    };
    const onThorchainConnect = async (item) => {
        if (item.title === 'TERRA STATION') {
            connect("EXTENSION")
        } else if(item.title === 'XDEFI WALLET') {
            request(window.xfi.thorchain, 'request_accounts', [])
        }else {
            handleClose();
            setKeystoreConnector(true);
        }
    }
    const onDeactiveWallet = () => {
        sessionStorage.close = "true";
        setIsSelectingWallet(true);
        deactivate(true); 
    };
    const retryConnect = (activating) => {
        setError(null);
        if (window.ethereum) {
            window.ethereum
                .request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: `0x${(97).toString(16)}`,
                            chainName: "SPIN Network",
                            rpcUrls: [
                                "https://data-seed-prebsc-1-s1.binance.org:8545"
                            ],
                            nativeCurrency: {
                                name: "SPIN",
                                symbol: "SPIN",
                                decimals: 18,
                            },
                            blockExplorerUrls: [
                                "https://testnet.bscscan.com"
                            ],
                        },
                    ],
                })
                .then(() => {
                    alert(
                        "You have successfully changed to Spin Test Network.",
                        "info"
                    );
                })
                .catch((error) => {
                    alert(error.toString(), "error");
                });
        }

        onConnectWallet(activating);
    };
    const changeWallet = (error) => {
        if (!error) {
            return true;
        } else {
            setError(null);
            setIsSelectingWallet(true);
        }
    }
    const handleClose = () => {
        setIsOpen(false);
    };
    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your Ethereum account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    };
    return (
        <>
        <Dialog
            onClose={handleClose}
            open={isOpen}
            maxWidth="xs"
            className={classes.cWallet}
            classes={{
                paper: "cwallet-paper"
            }}
        >
            <Box className="title">
                <DialogTitle color="black">
                    {!active ? "Select Wallet" : "Your Account"}
                </DialogTitle>
                <IconButton
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent className="content">
                {active && (
                    <List>
                        <ListItem className="item">
                            <ListItemIcon className="symbol">
                                <img src={cWallet.logo} alt={cWallet.name} />
                            </ListItemIcon>
                            <ListItemText
                                className="description"
                                primary={`Connected to ${cWallet.name}`}
                            />
                            <ListItemSecondaryAction className="action">
                                <Tooltip arrow title="Disconnect wallet">
                                    <IconButton size="small" onClick={onDeactiveWallet}>
                                        <LowPriorityRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className="item">
                            <ListItemIcon className="symbol">
                                <AccountBalanceWalletRoundedIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="description"
                                primary={`${account.substring(0, 8)} ... ${account.substring(account.length - 4)}`}
                            />
                            <ListItemSecondaryAction className="action">
                                <Link
                                    href={`https://testnet.bscscan.com/address/${account}`}
                                    target="_blank"
                                    underline="none"
                                >
                                    <Tooltip arrow title="View on explorer">
                                        <IconButton size="small">
                                            <LaunchRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                                <CopyToClipboard
                                    text={account}
                                >
                                    <Tooltip arrow title="Copy address">
                                        <IconButton size="small">
                                            <AssignmentTurnedInRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CopyToClipboard>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                )}
                {
                    !active && (() => {
                        if (isSelectingWallet) {
                            return (
                                <List>
                                    {Wallets.map((item, idx) => {
                                        return (
                                            item.connector === 'thorchain'?
                                            <ListItem
                                                key={idx}
                                                className="item"
                                                onClick={() => onThorchainConnect(item)}
                                            >
                                                <ListItemIcon className="symbol">
                                                    <img
                                                        src={item.logo}
                                                        alt={item.logo}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    className="description"
                                                    primary={item.title}
                                                />
                                            </ListItem>:
                                              <ListItem
                                              key={idx}
                                              className="item"
                                              onClick={() => onConnectWallet(item)}
                                          >
                                              <ListItemIcon className="symbol">
                                                  <img
                                                      src={item.logo}
                                                      alt={item.logo}
                                                  />
                                              </ListItemIcon>
                                              <ListItemText
                                                  className="description"
                                                  primary={item.title}
                                              />
                                          </ListItem>
                                        );
                                    })}
                                </List>
                            )
                        } else if (!isSelectingWallet) {
                            const activating = Wallets.find(item => (item.connector === activatingConnector || item.connector === connector));
                            return (
                                <List>
                                    <ListItem
                                        className="state"
                                    >
                                        <ListItemIcon className="symbol">
                                            {error ? (
                                                <IconButton>
                                                    <WarningRoundedIcon />
                                                </IconButton>
                                            ) : <CircularProgress />}
                                        </ListItemIcon>
                                        <ListItemText className="description">
                                            {error ? getErrorMessage(error) : "Initializing..."}
                                        </ListItemText>
                                        {
                                            error && (
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => retryConnect(activating)}>
                                                        <ReplayIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            )
                                        }
                                    </ListItem>
                                    <ListItem
                                        className="item activating-item"
                                        onClick={() => changeWallet(error)}
                                    >
                                        <ListItemIcon className="symbol">
                                            <img
                                                src={activating ? activating.logo : ""}
                                                alt={activating ? activating.logo : ""}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            className="activating-description"
                                            primary={activating ? activating.title : ""}
                                            secondary={activating ? activating.description : ""}
                                        />
                                    </ListItem>
                                </List>
                            )
                        }
                    })()
                }
            </DialogContent>
        </Dialog>
        {
            keystoreConnector ?
            <Keystore isOpen={keystoreConnector} setIsOpen={setKeystoreConnector}/> :''
        }
        </>
    );
};

export default Cwallet;
