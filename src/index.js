import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom';
import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
// ** Import Providers
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";
import Spinner from "./components/Spinner";

const App = lazy(() => import("./App"));




getChainOptions().then((chainOptions) => {
    ReactDOM.render(
        <React.StrictMode>
            <MaterialThemeProvider>
                <MuiSnackbarProvider>
                    <NotificationProvider>
                        <WalletProvider {...chainOptions}>
                            <Web3Provider>
                                <Suspense
                                    fallback={<Spinner />}
                                >
                                    <App />
                                </Suspense>
                            </Web3Provider>
                        </WalletProvider>,
                    </NotificationProvider>
                </MuiSnackbarProvider>
            </MaterialThemeProvider>
        </React.StrictMode>,
      document.getElementById('root'),
    );
  });