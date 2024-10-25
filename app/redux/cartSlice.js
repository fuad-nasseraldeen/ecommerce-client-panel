import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [], // Initialize as an empty array
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartRequest: (state) => {
      state.loading = true
      state.error = null
    },
    addCartSuccess: (state, action) => {
      state.loading = false
      if (Array.isArray(state.cart)) {
        state.cart = [...state.cart, action.payload]
      } else {
        state.cart = [action.payload]
      }
    },
    fetchCartFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    removeCartSuccess: (state, action) => {
      state.loading = false
      if (Array.isArray(state.cart)) {
        state.cart = state.cart.filter((_, index) => index !== action.payload)
      }
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

export const { fetchCartRequest, addCartSuccess, fetchCartFailure, removeCartSuccess, clearCart } = cartSlice.actions
export default cartSlice.reducer
