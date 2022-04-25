import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'connectedWallets',
  initialState: {
    value: [],
  },
  reducers: {
    addWallet: (state, action) => {
      console.log(action, action.payload)
      state.value.push(action.payload)
    },
    removeWallet: (state, action) => {
      state.value = state.value.filter(e => action.payload !== e);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addWallet, removeWallet } = walletSlice.actions

export default walletSlice.reducer