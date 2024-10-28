import axios from 'axios'
import {
  fetchCartRequest,
  addCartSuccess,
  fetchCartFailure,
  removeCartSuccess,
  saveCartFromLocalStorageSuccess,
} from './cartSlice'

export const addProductToCart = (product) => async (dispatch, getState) => {
  dispatch(fetchCartRequest())
  try {
    dispatch(addCartSuccess(product))

    const updatedCart = getState().cart.items
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  } catch (error) {
    dispatch(fetchCartFailure(error.message))
  }
}

export const removeProductFromCart = (productIndex) => async (dispatch, getState) => {
  dispatch(fetchCartRequest())
  try {
    dispatch(removeCartSuccess(productIndex))

    const updatedCart = getState().cart.items
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  } catch (error) {
    dispatch(fetchCartFailure(error.message))
  }
}

export const clearCart = () => async (dispatch) => {
  dispatch(clearCart())
}

export const loadCartFromLocalStorage = () => (dispatch) => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    try {
      dispatch(fetchCartRequest())
      dispatch(saveCartFromLocalStorageSuccess(JSON.parse(savedCart)))
    } catch (error) {
      dispatch(fetchCartFailure(error.message))
    }
  }
}
