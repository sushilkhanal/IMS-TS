import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userSlice } from '../features/users/userSlice'
export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware)
})
setupListeners(store.dispatch)
