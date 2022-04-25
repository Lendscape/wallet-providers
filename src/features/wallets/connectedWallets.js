import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'connectedWallets',
  initialState: {
    value: [],
  },
  reducers: {
    addWallet: (state, action) => {
      state.value.push(action.payload)
    },
    removeWallet: (state, action) => {
      state.value = state.value.filter(e => action.payload.type !== e.type);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addWallet, removeWallet } = walletSlice.actions

export default walletSlice.reducer