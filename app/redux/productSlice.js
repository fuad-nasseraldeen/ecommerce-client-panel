import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  homePageProduct: null,
  productsByCategory: [],
  categories: [],
  newArrivals: [],
  loading: false,
  productsLoaded: false,
  categoriesLoaded: false,
  newArrivalsLoaded: false,
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
      state.productsLoaded = true
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.productsLoaded = true
    },
    setProducts: (state, action) => {
      state.products = action.payload
      state.productsLoaded = true
    },
    setCategories: (state, action) => {
      state.categories = action.payload
      state.categoriesLoaded = true
    },
    setCategoriesFailure: (state, action) => {
      state.error = action.payload
      state.categoriesLoaded = true
    },
    setNewArrivals: (state, action) => {
      state.newArrivals = action.payload
      state.newArrivalsLoaded = true
    },
    setNewArrivalsFailure: (state, action) => {
      state.error = action.payload
      state.newArrivalsLoaded = true
    },
    setHomePageProduct: (state, action) => {
      state.loading = false
      state.homePageProduct = action.payload
    },
    setProductsByCategory: (state, action) => {
      state.productsByCategory = action.payload
    },
    setClearProductsByCategory: (state) => {
      state.productsByCategory = []
    },
  },
})

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setProducts,
  setCategories,
  setCategoriesFailure,
  setNewArrivals,
  setNewArrivalsFailure,
  setHomePageProduct,
  setProductsByCategory,
  setClearProductsByCategory,
} = productSlice.actions
export default productSlice.reducer
