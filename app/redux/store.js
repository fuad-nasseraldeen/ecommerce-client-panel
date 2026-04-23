import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import checkoutSlice from './checkoutSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutSlice,
  },
})

export default store
