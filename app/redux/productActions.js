import axios from 'axios'
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCategories,
  setNewArrivals,
  setHomePageProduct,
  setProductsByCategory,
  setClearProductsByCategory,
} from './productSlice'

// Fetch Products
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest())
  try {
    const response = await axios.get('/api/products')
    dispatch(fetchProductsSuccess(response.data))
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
export const fetchHomePageProduct = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/products/details/${productId}`)
    dispatch(setHomePageProduct(response.data))
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

// Fetch New Arrivals
export const fetchNewArrivals = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/newArrivals')
    dispatch(setNewArrivals(response.data))
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
  }
}

// Fetch Categories
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/categories')
    dispatch(setCategories(response.data))
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

export const fetchProductsByCategory = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/products/category/${id}`)

    dispatch(setProductsByCategory(response.data))
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
export const clearProductsByCategory = () => async (dispatch) => {
  dispatch(setClearProductsByCategory())
}
