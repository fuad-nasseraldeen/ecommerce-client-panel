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
    const products = response.data
    const reorderProducts = products
      ?.map((product) => ({
        ...product,
        randomOrder: Math.floor(Math.random() * (30 - 10 + 1)) + 10, // Random number between 10 and 30
      }))
      .sort((a, b) => a.randomOrder - b.randomOrder)
    dispatch(fetchProductsSuccess(reorderProducts))
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
export const fetchHomePageProduct = (productId) => async (dispatch) => {
  dispatch(fetchProductsRequest())
  try {
    // Send the product ID as a query parameter
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
    const newArrivals = response.data
    const reorderProducts = newArrivals
      ?.map((product) => ({
        ...product,
        randomOrder: Math.floor(Math.random() * (30 - 10 + 1)) + 10, // Random number between 10 and 30
      }))
      .sort((a, b) => a.randomOrder - b.randomOrder)
    dispatch(setNewArrivals(reorderProducts))
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
  }
}

// Fetch Categories
export const fetchCategories = () => async (dispatch) => {
  try {
    console.log('start fetch Category')
    const response = await axios.get('/api/categories')
    dispatch(setCategories(response.data))
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

export const fetchProductsByCategory = (id) => async (dispatch) => {
  console.log('start fetch Products By Category')
  try {
    const response = await axios.get(`/api/products/category/${id}`)

    dispatch(setProductsByCategory(response.data))
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
export const clearProductsByCategory = () => async (dispatch) => {
  console.log('clearProductsByCategory')
  dispatch(setClearProductsByCategory())
}
