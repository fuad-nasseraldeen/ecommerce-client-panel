import axios from 'axios'
import { fetchCartRequest, addCartSuccess, fetchCartFailure, removeCartSuccess } from './cartSlice'

export const addProductToCart = (cartProducts) => async (dispatch) => {
  dispatch(fetchCartRequest())
  try {
    const response = await axios.post('/api/cart', { ids: cartProducts })
    dispatch(addCartSuccess(response.data))
  } catch (error) {
    dispatch(fetchCartFailure(error.message))
  }
}
export const removeProductFromCart = (id) => async (dispatch) => {
  dispatch(fetchCartRequest())
  try {
    const response = await axios.post('/api/cart', { ids: cartProducts })
    dispatch(removeCartSuccess(response.data))
  } catch (error) {
    dispatch(fetchCartFailure(error.message))
  }
}
export const clearCart = () => async (dispatch) => {
  console.log('clear cart')
  dispatch(clearCart())
}
