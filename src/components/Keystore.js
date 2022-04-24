import React, { useState, useEffect } from "react";

// ** Web3 React
// import {
//     NoEthereumProviderError,
//     UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
// import { useWallet } from '@terra-money/wallet-provider';

// import { generatePhrase, validatePhrase, encryptToKeyStore, decryptFromKeystore } from "@xchainjs/xchain-crypto"
import {
    generatePhrase,
    validatePhrase,
    encryptToKeyStore,
} from "@xchainjs/xchain-crypto";

import {
    URI_AVAILABLE,
    // UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";

// import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
// Import Material UI Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
// import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
// import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
// import CircularProgress from "@mui/material/CircularProgress";
// import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
// import { InputBase } from '@mui/material';

// Import Assets
import useStyles from "../assets/constants/styles";
// import { Wallets, ConnectedWallet } from "../assets/constants/wallets";

// Import Icons
import CloseIcon from "@mui/icons-material/Close";
// import ReplayIcon from '@mui/icons-material/Replay';
// import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
// import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
// import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
// import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
// import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';

import { walletconnect } from "../assets/constants/connectors";

// import { bech32 } from 'bech32'
import crypto from "crypto";
// import hexEncoding from 'crypto-js/enc-hex'
// import ripemd160 from 'crypto-js/ripemd160'
// import sha256 from 'crypto-js/sha256'
import * as bip39 from "bip39";
import { blake256 } from "foundry-primitives";

const Cwallet = ({ isOpen, setIsOpen }) => {
    const classes = useStyles();
    const hashFunction = "sha256";
    let fileReader;
    const {
        // active,
        connector,
    } = useWeb3React();

    const [activatingConnector, setActivatingConnector] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [decryptionpass, setDecryptionpass] = useState("");
    const [type, setType] = useState(true);
    const [file, setFile] = useState();
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
    // ** Actions

    const decryptFromKeystore = async (keystore, password) => {
        const kdfparams = keystore.crypto.kdfparams;
        console.log(kdfparams, "kdf", hashFunction, "sh");
        const derivedKey = await pbkdf2Async(
            Buffer.from(password),
            Buffer.from(kdfparams.salt, "hex"),
            kdfparams.c,
            kdfparams.dklen,
            hashFunction
        );

        const ciphertext = Buffer.from(keystore.crypto.ciphertext, "hex");
        const mac = blake256(
            Buffer.concat([derivedKey.slice(16, 32), ciphertext])
        );
        try {
            if (mac !== keystore.crypto.mac) alert("Invalid password");
            const decipher = crypto.createDecipheriv(
                keystore.crypto.cipher,
                derivedKey.slice(0, 16),
                Buffer.from(keystore.crypto.cipherparams.iv, "hex")
            );
            const phrase = Buffer.concat([
                decipher.update(ciphertext),
                decipher.final(),
            ]);
            return phrase.toString("utf8");
        } catch (e) {
            console.log(e);
        }
    };

    const getSeed = (phrase) => {
        if (!validatePhrase(phrase)) {
            console.log("Invalid BIP39 phrase");
        }
        return bip39.mnemonicToSeedSync(phrase);
    };

    // const encodeAddress = (value, prefix = 'thor', type = 'hex') => {
    //     let words
    //     if (Buffer.isBuffer(value)) {
    //         words = bech32.toWords(Buffer.from(value))
    //     } else {
    //         words = bech32.toWords(Buffer.from(value, type))
    //     }
    //     return bech32.encode(prefix, words)
    // }

    // const sha256ripemd160 = (hex) => {
    //     if (typeof hex !== 'string') throw new Error('sha256ripemd160 expects a string')
    //     if (hex.length % 2 !== 0) throw new Error(`invalid hex string length: ${hex}`)
    //     const hexEncoded = hexEncoding.parse(hex)
    //     const ProgramSha256 = sha256(hexEncoded)
    //     return ripemd160(ProgramSha256).toString()
    // }

    const pbkdf2Async = async (
        passphrase,
        salt,
        iterations,
        keylen,
        digest
    ) => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(
                passphrase,
                salt,
                iterations,
                keylen,
                digest,
                (err, drived) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(drived);
                    }
                }
            );
        });
    };

    const GenerateKeystore = async () => {
        if (password && confirmpass && password === confirmpass) {
            const phrase = generatePhrase();
            console.log(`phrase ${phrase}`);
            const isCorrect = validatePhrase(phrase); //validate phrase if needed returns Boolean
            console.log(`Phrase valid?: ${isCorrect}`);
            const keystore = await encryptToKeyStore(phrase, password);
            console.log(keystore, "keystore");
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(keystore)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = "keystore.txt";
            link.click();
        } else {
            alert("Plz input password correctly");
            return;
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleFileRead = async () => {
        const content = fileReader.result;
        console.log(content);
        let phrase = await decryptFromKeystore(
            JSON.parse(content),
            decryptionpass
        );
        console.log(`Phrase: ${phrase}`);
        let seed = getSeed(phrase);
        console.log(seed, "seed");
        setIsOpen(false);
        // … do something with the 'content' …
    };

    const handleFileChosen = (file) => {
        if (!file) {
            alert("plz choose file");
            return;
        } else if (!decryptionpass) {
            alert("plz enter password");
            return;
        } else {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        }
    };

    return (
        <Dialog
            onClose={handleClose}
            open={isOpen}
            maxWidth="xs"
            className={classes.cWallet}
            classes={{
                paper: "cwallet-paper",
            }}
        >
            <Box className="title">
                <DialogTitle color="black">
                    {!type ? "CONNECT KEYSTORE" : "CREATE KEYSTORE"}
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
                {type === true ? (
                    <List>
                        <ListItem className="item">
                            <label>Input Password</label>
                        </ListItem>
                        <ListItem className="item">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                style={{ width: "100%" }}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </ListItem>
                        <ListItem className="item">
                            <label>Confirm Password</label>
                        </ListItem>
                        <ListItem className="item">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                style={{ width: "100%" }}
                                onChange={(e) => setConfirmpass(e.target.value)}
                            ></input>
                        </ListItem>
                        <ListItem
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                            className="item"
                        >
                            <button onClick={() => GenerateKeystore()}>
                                CREATE
                            </button>
                            <button onClick={() => setType(false)}>
                                CONNECT WALLET
                            </button>
                        </ListItem>
                    </List>
                ) : (
                    <List>
                        <ListItem className="item">
                            <label>Please Select Keystore File</label>
                        </ListItem>
                        <ListItem className="item">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            ></input>
                        </ListItem>
                        <ListItem className="item">
                            <label>Decryption password</label>
                        </ListItem>
                        <ListItem className="item">
                            <input
                                type="password"
                                placeholder="Password"
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                    setDecryptionpass(e.target.value)
                                }
                            ></input>
                        </ListItem>
                        <ListItem
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                            className="item"
                        >
                            <button onClick={() => handleFileChosen(file)}>
                                UNLOCK
                            </button>
                            <button onClick={() => setType(true)}>
                                CREATE WALLET
                            </button>
                        </ListItem>
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Cwallet;
