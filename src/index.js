import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';

// Import Redux
import { Provider } from 'react-redux';
import store from './redux/storeConfig/store'

import { getLibrary } from './utils/web3React';

import App from './App';

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Web3ReactProvider>,
  document.getElementById('root')
);