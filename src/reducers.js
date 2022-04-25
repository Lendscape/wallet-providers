import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./features/wallets/connectedWallets";

export default configureStore({
  reducer: {
    wallets: walletReducer
  },
})