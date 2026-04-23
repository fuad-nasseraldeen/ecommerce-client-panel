import axios from 'axios'
import {
  fetchCheckoutDetailsRequest,
  addCheckoutDetailsSuccess,
  saveCheckoutDetailsFromLocalStorageSuccess,
  fetchCheckoutDetailsFailure,
  clearCheckout,
} from './checkoutSlice'

const CHECKOUT_STORAGE_KEY = 'checkout.details'
const LEGACY_CHECKOUT_STORAGE_KEY = 'checkoutDetails'

export const fetchPaymentCart =
  ({ name, email, city, postalCode, streetAddress, country, cart }) =>
  async (dispatch) => {
    dispatch(fetchCheckoutDetailsRequest())
    try {
      const response = await axios.post('/api/checkout', {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cart,
      })
      if (response.data.url) {
        window.location = response.data.url
      }
    } catch (error) {
      dispatch(fetchCheckoutDetailsFailure(error.message))
    }
  }
export const addCheckoutDetails = (details) => async (dispatch, getState) => {
  dispatch(fetchCheckoutDetailsRequest())
  try {
    dispatch(addCheckoutDetailsSuccess(details))

    const updatedCheckoutDetails = getState().checkout.details
    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(updatedCheckoutDetails))
  } catch (error) {
    dispatch(fetchCheckoutDetailsFailure(error.message))
  }
}

export const clearCheckoutDetails = () => async (dispatch) => {
  dispatch(clearCheckout())
  localStorage.removeItem(CHECKOUT_STORAGE_KEY)
  localStorage.removeItem(LEGACY_CHECKOUT_STORAGE_KEY)
}

export const loadCheckoutDetailsFromLocalStorage = () => (dispatch) => {
  const updatedCheckoutDetails =
    localStorage.getItem(CHECKOUT_STORAGE_KEY) || localStorage.getItem(LEGACY_CHECKOUT_STORAGE_KEY)
  if (updatedCheckoutDetails) {
    dispatch(fetchCheckoutDetailsRequest())
    try {
      dispatch(saveCheckoutDetailsFromLocalStorageSuccess(JSON.parse(updatedCheckoutDetails)))
    } catch (error) {
      dispatch(fetchCheckoutDetailsFailure(error.message))
    }
  }
}
