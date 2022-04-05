import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material';

// Import Components
import Header from '../components/Header'

// import utils
import { useConnectWallet, useDisconnectWallet } from "../utils/hooks";
import { createweb3Modal } from "../utils/createweb3Modal";

export const MainLayout = () => {

    const {
        connectWallet,
        web3,
        address,
        networkId,
        connected
    } = useConnectWallet();
    const { disconnectWallet } = useDisconnectWallet();
    const [web3Modal, setModal] = useState(null);


    useEffect(() => {
        setModal(createweb3Modal);
    }, [setModal]);

    const connectWalletCallback = useCallback(() => {
        connectWallet(web3Modal);
    }, [web3Modal, connectWallet]);

    const disconnectWalletCallback = useCallback(() => {
        disconnectWallet(web3, web3Modal);
    }, [web3, web3Modal, disconnectWallet]);

    return (
        <>
            <Header
                address={address}
                connected={connected}
                connectWallet={connectWalletCallback}
                disconnectWallet={disconnectWalletCallback}
            />
            <Container>
                {networkId}
                <Outlet />
            </Container>
        </>
    )
}
