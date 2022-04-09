import React, { useState, useEffect } from "react";
import Keystore from "./Keystore";

// ** Web3 React
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useWallet } from '@terra-money/wallet-provider';
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";

import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
// Import Material UI Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";

// Import Assets
import useStyles from "../assets/constants/styles";
import { ConnectedWallet, Chains } from "../assets/constants/wallets";

// Import Icons
import CloseIcon from "@mui/icons-material/Close";

import { walletconnect } from "../assets/constants/connectors";

const Cwallet = ({ isOpen, setIsOpen }) => {
    const classes = useStyles();

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
    const [multichains, setMultichains] = useState(Chains);
    const [activatingConnector, setActivatingConnector] = useState(false);
    const [isSelectingWallet, setIsSelectingWallet] = useState(true);
    const [keystoreConnector, setKeystoreConnector] = useState(false);
    const xfiObject = window.xfi;

    // ** Effects
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

  
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

    //xdefi wallect connect function
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

    const onWalletConnect = () => {
        for(let i=0; i<multichains.length; i ++) {
            if(multichains[i].choose === true) {
                request(xfiObject[multichains[i].network], 'request_accounts', [])
            }
        }
    }
   
    const handleClose = () => {
        setIsOpen(false);
    };

    const onSelectChain = (index) => {
        const data = [...multichains];
        console.log(data[index], "inde")
        if(data[index].choose === true) {
            data[index].choose = false;
            setMultichains(data);
        } else {
            data[index].choose = true;
            setMultichains(data);
        }

    }

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
                        Select Chain
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
                    {
                        !active && (() => {
                            return (
                                <List>
                                    {multichains.map((item, idx) => {
                                        return (
                                            item.choose === true?
                                            <ListItem
                                                key={idx}
                                                className="item-selected"
                                                onClick={() => onSelectChain(idx)}
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
                                              onClick={() => onSelectChain(idx)}
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
                                        )
                                    }
                                    )}
                                </List>
                            )
                        })()
                    }
                </DialogContent>
                <Box className="connect">
                    <Button variant="contained" onClick={() => onWalletConnect()}>CONNECT</Button>
                </Box>
            </Dialog>
            {
                keystoreConnector ?
                    <Keystore isOpen={keystoreConnector} setIsOpen={setKeystoreConnector} /> : ''
            }
        </>
    );
};

export default Cwallet;
