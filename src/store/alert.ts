import { AlertStatus } from '@chakra-ui/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AlertStorage {
  isOn: boolean,
  message: string,
  status: AlertStatus
}

const initialState: AlertStorage = {
  isOn: false,
  message: 'Asking for permission in Ledger.',
  status: 'info'
};

export const alertSlice = createSlice({
  name: 'alertStorage',
  initialState,
  reducers: {
    close(state: AlertStorage) {
      state.isOn = false;
    },
    open(state: AlertStorage) {
      state.isOn = true;
    },
    changeAlert(state: AlertStorage, action: PayloadAction<{message: string, isOn: boolean, status?: AlertStatus}>) {
      state.isOn = action.payload.isOn;
      state.message = action.payload.message;
      state.status = action.payload.status ?? 'info';
    }
  },
})

export const { close, open, changeAlert } = alertSlice.actions

export default alertSlice.reducer