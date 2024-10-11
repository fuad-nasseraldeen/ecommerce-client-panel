import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]) // Always initialize as an empty array

  // Load the cart from localStorage after the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart))
    }
  }, [])

  // Sync the cart to localStorage whenever cartProducts changes
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId])
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const postionProductId = prev.indexOf(productId)
      if (postionProductId !== -1) {
        return prev.filter((value, index) => index !== postionProductId)
      }
    })
  }
    function clearCart() {
      setCartProducts([])
    }
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
