import { createSelector } from '@reduxjs/toolkit'

export const selectCartItems = (state) => state.cart.items
export const selectCheckoutDetails = (state) => state.checkout.details[0] || null
export const selectProductsState = (state) => state.products

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((acc, item) => acc + item.quantity, 0),
)

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0),
)
