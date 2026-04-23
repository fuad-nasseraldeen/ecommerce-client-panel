import {
  fetchCartRequest,
  addCartSuccess,
  fetchCartFailure,
  removeCartSuccess,
  saveCartFromLocalStorageSuccess,
  clearCart as clearCartSuccess,
} from './cartSlice'

export const addProductToCart = (product) => async (dispatch, getState) => {
  try {
    dispatch(addCartSuccess(product))

    const updatedCart = getState().cart.items
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  } catch (error) {
    dispatch(fetchCartFailure(error.message))
  }
}

export const removeProductFromCart = (product) => async (dispatch, getState) => {
  try {
    dispatch(removeCartSuccess(product))

    const updatedCart = getState().cart.items
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  } catch (error) {
    dispatch(fetchCartFailure(error.message))
  }
}

export const clearCart = () => async (dispatch) => {
  dispatch(clearCartSuccess())
  localStorage.removeItem('cart')
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
