'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../header/page'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import CartItemsBox from '@/app/components/CartItemsBox'
import OrderForm from '@/app/components/OrderForm'
import RetryMessage from '@/app/components/RetryMessage'
import ThankYouMessage from '@/app/components/ThankYouMessage'
import { handleDisabledProceedToCheckout, isValidEmail } from '@/app/util/checkoutUtils'
import Loading from '@/app/components/Loading'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { addProductToCart, removeProductFromCart, clearCart } from '@/app/redux/cartActions'
import { addCheckoutDetails, clearCheckoutDetails, fetchPaymentCart } from '@/app/redux/checkoutActions'

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 100px;
`

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`
const checkoutDetailsErrors = {
  name: '',
  email: '',
  city: '',
  streetAddress: '',
  postalCode: '',
  country: ''
}
export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)
  const error = useSelector((state) => state.checkout.error)
  const loading = useSelector((state) => state.checkout.loading)
  const checkoutDetails = useSelector((state) => state.checkout.details[0])
  const [errors, setErrors] = useState(Object.assign({}, checkoutDetailsErrors))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)
  const [isDisabled, SetIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
const [tryAgainFlag, setTryAgainFlag] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window?.location.href.includes('success')) {
      setIsSuccess(true)
      if (cart?.length > 0) {
        dispatch(clearCart())
        dispatch(clearCheckoutDetails())
      }
    }
  }, [dispatch, cart])

  useEffect(() => {
    if (checkoutDetails) {
      setName(checkoutDetails.name || '')
      setEmail(checkoutDetails.email || '')
      setCity(checkoutDetails.city || '')
      setPostalCode(checkoutDetails.postalCode || '')
      setStreetAddress(checkoutDetails.streetAddress || '')
      setCountry(checkoutDetails.country || '')
    }
  }, [checkoutDetails])

  useEffect(() => {
    SetIsDisabled(handleDisabledProceedToCheckout({ name, email, city, postalCode, streetAddress, country }))
  }, [name, email, city, postalCode, streetAddress, country])

  useEffect(() => {
    const currentErrors = validateFields({ name, email, city, postalCode, streetAddress, country })
    setErrors(currentErrors)
  }, [name, email, city, postalCode, streetAddress, country])


  const addProduct = useCallback(
    (product) => {
      NProgress.start()
      dispatch(addProductToCart(product))
      NProgress.done()
    },
    [dispatch],
  )

  const removeProduct = useCallback(
    (index) => {
      NProgress.start()
      dispatch(removeProductFromCart(index))
      NProgress.done()
    },
    [dispatch],
  )
const validateFields = (fields) => {
  const validationErrors = {}
    Object.keys(checkoutDetailsErrors).forEach((key) => {
      if (!fields[key]) validationErrors[key] = `Field ${key} can't be empty`
    })
  if (!isValidEmail(fields?.email)) validationErrors.email = 'Please enter a valid email address'
  return validationErrors
}

  const handlePayment = useCallback(async () => {
    setTryAgainFlag(true)
    const hasEmptyFields = !checkoutDetails || Object.values(checkoutDetails).some((field) => !field)
    const isEmailValid = isValidEmail(email)

    if (hasEmptyFields || !isEmailValid) {
      setErrors(validateFields(checkoutDetails))
      setTryAgainFlag(false)
      return
    }

    setIsLoading(true)
    try {
      await dispatch(fetchPaymentCart({ name, email, city, postalCode, streetAddress, country, cart }))
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, email, city, postalCode, streetAddress, country, cart, errors, checkoutDetails])


  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)

  const handleChange = useCallback(
    (key, value) => {
      setErrors({...errors, [key]: ''})
      switch (key) {
        case 'name':
          setName(value)
          break
        case 'email':
          setEmail(value)
          break
        case 'city':
          setCity(value)
          break
        case 'postalCode':
          setPostalCode(value)
          break
        case 'streetAddress':
          setStreetAddress(value)
          break
        case 'country':
          setCountry(value)
          break
        default:
          return
      }
      dispatch(addCheckoutDetails({ [key]: value }))
    },
    [dispatch],
  )

  if (isSuccess) return <ThankYouMessage />
  if (isLoading || loading)
    return (
      <Center>
        <Loading />
      </Center>
    )
const renderOrderForm = () => {
  if (error && tryAgainFlag) return <RetryMessage onRetry={() => setTryAgainFlag(false)} />
  return (
    <OrderForm
      cart={cart}
      fields={{ name, email, city, postalCode, streetAddress, country }}
      onChange={handleChange}
      onPayment={handlePayment}
      isDisabled={isDisabled}
      errors={errors}
    />
  )
}

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <CartItemsBox cart={cart} total={total} addProduct={addProduct} removeProduct={removeProduct} />
          {!!cart.length && (
            <Box>
              <h2>Order information</h2>
              {renderOrderForm()}
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}
