import React, { useState } from 'react'
import $ from 'jquery'
import Cwallet from "./Cwallet";
import { useWeb3React } from "@web3-react/core";
import Button from '@mui/material/Button';
import useStyles from "../assets/constants/styles";

const Header = () => {
    const classes = useStyles();
    const close = () => {
        $('body').removeClass('active')
    }

    const menutoggle = () => {
        $('body').addClass('active')
    }

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError } = useWeb3React();

    const onConnectWallet = async () => {
        setIsOpenDialog(true);
    }

    return (
        <header 
            className={classes.Header}
        >
            {
                active ?
                    <Button variant="contained" className="button-connected" onClick={onConnectWallet}> {account.substring(0, 3)} ... {account.substring(account.length - 3)}</Button>
                    :
                    <Button variant="contained" className="button-connect" onClick={onConnectWallet}>Connect</Button>
            }
            <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
        </header>
    )
}

export default Header