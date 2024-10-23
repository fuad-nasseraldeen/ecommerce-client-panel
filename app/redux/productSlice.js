import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  homePageProduct: null,
  productsByCategory: [],
  categories: [],
  newArrivals: [],
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setNewArrivals: (state, action) => {
      state.newArrivals = action.payload
    },
    setHomePageProduct: (state, action) => {
      state.loading = false
      state.homePageProduct = action.payload
    },
    setProductsByCategory: (state, action) => {
      state.productsByCategory = action.payload
    },
    setClearProductsByCategory: (state, action) => {
      state.productsByCategory = null
    },
  },
})

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setProducts,
  setCategories,
  setNewArrivals,
  setHomePageProduct,
  setProductsByCategory,
  setClearProductsByCategory,
} = productSlice.actions
export default productSlice.reducer
