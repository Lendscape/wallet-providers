import { configureStore } from '@reduxjs/toolkit'
import alertSlice from './alert'
import walletSlice from './wallets'

export const store = configureStore({
  reducer: {
    walletStorage: walletSlice,
    alertStorage: alertSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch