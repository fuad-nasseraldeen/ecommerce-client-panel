import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import productReducer from './productSlice'
import cartReducer from './cartSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store
