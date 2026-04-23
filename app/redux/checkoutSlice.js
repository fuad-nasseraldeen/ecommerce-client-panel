import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  details: [],
  loading: false,
  error: null,
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    fetchCheckoutDetailsRequest: (state) => {
      state.loading = true
      state.error = null
    },
    addCheckoutDetailsSuccess: (state, action) => {
      state.loading = false

      // Check if we already have details
      const existingDetails = state.details[0] || {}

      // Update existing details with new payload
      const updatedDetails = { ...existingDetails, ...action.payload }

      // Set details
      state.details = [updatedDetails]
    },
    saveCheckoutDetailsFromLocalStorageSuccess: (state, action) => {
      state.loading = false
      state.details = action.payload
    },
    fetchCheckoutDetailsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearCheckout: (state) => {
      state.details = []
    },
  },
})

// Export actions
export const {
  fetchCheckoutDetailsRequest,
  addCheckoutDetailsSuccess,
  saveCheckoutDetailsFromLocalStorageSuccess,
  fetchCheckoutDetailsFailure,
  clearCheckout,
} = checkoutSlice.actions

// Export reducer
export default checkoutSlice.reducer
