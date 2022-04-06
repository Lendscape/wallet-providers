import React, { useState } from 'react'
import $ from 'jquery'
import Cwallet from "./Cwallet";
import { useWeb3React } from "@web3-react/core";

const Header = () => {
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
        <header>
            {
                active ?
                    <button className="button-connected" onClick={onConnectWallet}> {account.substring(0, 3)} ... {account.substring(account.length - 3)}</button>
                    :
                    <button className="button-connect" onClick={onConnectWallet}>Connect</button>
            }
            <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
        </header>
    )
}

export default Header