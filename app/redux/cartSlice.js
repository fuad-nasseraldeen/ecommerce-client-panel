import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
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
      const existingProduct = state.items.find((item) => item._id === action.payload._id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    saveCartFromLocalStorageSuccess: (state, action) => {
      state.loading = false
      state.items = action.payload
    },
    fetchCartFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    removeCartSuccess: (state, action) => {
      state.loading = false
      const existingProductIndex = state.items.findIndex((item) => item._id === action.payload._id)
      state.items[existingProductIndex].quantity--
      state.items[existingProductIndex].quantity < 1 ? state.items.splice(existingProductIndex, 1) : state.items
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  fetchCartRequest,
  addCartSuccess,
  fetchCartFailure,
  removeCartSuccess,
  clearCart,
  saveCartFromLocalStorageSuccess,
} = cartSlice.actions
export default cartSlice.reducer
