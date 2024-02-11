import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import basketReducer from './basket/basket'

export const store = configureStore({
  reducer: { auth: authReducer, basket: basketReducer },
})