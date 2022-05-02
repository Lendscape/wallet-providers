import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// `ChakraProvider` component UI
import { ChakraProvider } from '@chakra-ui/react'
// Extended Theme
import theme from './theme';
// Redux react
import { store } from './store'
import { Provider } from 'react-redux'

//Terra wallet
import {
  WalletProvider,
  getChainOptions,
} from "@terra-money/wallet-provider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

getChainOptions().then((chainOptions) => {
  root.render(
    <WalletProvider {...chainOptions}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          {<App />}
        </ChakraProvider>
      </Provider>
    </WalletProvider>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
