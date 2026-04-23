// ./redux/Providers.js
'use client'
import { Provider } from 'react-redux'
import store from '@/app/redux/store'
import { useEffect } from 'react'
import { loadCartFromLocalStorage } from '@/app/redux/cartActions'
import { loadCheckoutDetailsFromLocalStorage } from '@/app/redux/checkoutActions'

export function Providers({ children }) {
  useEffect(() => {
    store.dispatch(loadCartFromLocalStorage())
    store.dispatch(loadCheckoutDetailsFromLocalStorage())
  }, [])

  return <Provider store={store}>{children}</Provider>
}
