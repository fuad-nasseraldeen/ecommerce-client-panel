'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../header/page'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import CartItemsBox from '@/app/components/CartItemsBox'
import OrderForm from '@/app/components/OrderForm'
import RetryMessage from '@/app/components/RetryMessage'
import ThankYouMessage from '@/app/components/ThankYouMessage'
import { isValidEmail } from '@/app/util/checkoutUtils'
import Loading from '@/app/components/Loading'

import { addProductToCart, removeProductFromCart, clearCart } from '@/app/redux/cartActions'
import { addCheckoutDetails, clearCheckoutDetails, fetchPaymentCart } from '@/app/redux/checkoutActions'
import { selectCartItems, selectCartTotal, selectCheckoutDetails } from '@/app/redux/selectors'

const Section = styled.section`
  padding: 1.2rem 0 5rem;
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media screen and (min-width: 960px) {
    grid-template-columns: 1.25fr 0.75fr;
    gap: 1.2rem;
  }
`

const Box = styled.div`
  background-color: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
`

const Heading = styled.h2`
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
`

const FieldError = {
  name: '',
  email: '',
  city: '',
  streetAddress: '',
  postalCode: '',
  country: '',
}

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)
  const checkoutDetails = useSelector(selectCheckoutDetails)
  const total = useSelector(selectCartTotal)
  const checkoutError = useSelector((state) => state.checkout.error)
  const checkoutLoading = useSelector((state) => state.checkout.loading)

  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitAttempt, setHasSubmitAttempt] = useState(false)
  const [errors, setErrors] = useState(FieldError)
  const [fields, setFields] = useState({
    name: '',
    email: '',
    city: '',
    postalCode: '',
    streetAddress: '',
    country: '',
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.location.search.includes('success=1')) {
      setIsSuccess(true)
      if (cart?.length > 0) {
        dispatch(clearCart())
        dispatch(clearCheckoutDetails())
      }
    }
  }, [dispatch, cart])

  useEffect(() => {
    if (checkoutDetails) {
      setFields((prev) => ({ ...prev, ...checkoutDetails }))
    }
  }, [checkoutDetails])

  const validateFields = useCallback((payload) => {
    const validationErrors = {}

    Object.keys(FieldError).forEach((key) => {
      if (!payload[key]) validationErrors[key] = `Field ${key} can't be empty`
    })

    if (payload.email && !isValidEmail(payload.email)) {
      validationErrors.email = 'Please enter a valid email address'
    }

    return validationErrors
  }, [])

  useEffect(() => {
    if (!hasSubmitAttempt) return
    setErrors(validateFields(fields))
  }, [fields, hasSubmitAttempt, validateFields])

  const isDisabled = useMemo(() => {
    return Object.values(fields).some((value) => !value) || !isValidEmail(fields.email)
  }, [fields])

  const addProduct = useCallback(
    (product) => {
      dispatch(addProductToCart(product))
    },
    [dispatch],
  )

  const removeProduct = useCallback(
    (product) => {
      dispatch(removeProductFromCart(product))
    },
    [dispatch],
  )

  const handleChange = useCallback(
    (key, value) => {
      setFields((prev) => {
        const nextState = { ...prev, [key]: value }
        dispatch(addCheckoutDetails({ [key]: value }))
        return nextState
      })

      setErrors((prev) => ({ ...prev, [key]: '' }))
    },
    [dispatch],
  )

  const handlePayment = useCallback(async () => {
    setHasSubmitAttempt(true)
    const validationErrors = validateFields(fields)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await dispatch(fetchPaymentCart({ ...fields, cart }))
    } finally {
      setIsSubmitting(false)
    }
  }, [dispatch, fields, cart, validateFields])

  if (isSuccess) return <ThankYouMessage />

  if (isSubmitting || checkoutLoading) {
    return (
      <Center>
        <Loading />
      </Center>
    )
  }

  return (
    <>
      <Header />
      <Section>
        <Center>
          <ColumnsWrapper>
            <CartItemsBox cart={cart} total={total.toFixed(2)} addProduct={addProduct} removeProduct={removeProduct} />

            {!!cart.length && (
              <Box>
                <Heading>Order information</Heading>
                {checkoutError && hasSubmitAttempt ? (
                  <RetryMessage onRetry={() => setHasSubmitAttempt(false)} />
                ) : (
                  <OrderForm
                    cart={cart}
                    fields={fields}
                    onChange={handleChange}
                    onPayment={handlePayment}
                    isDisabled={isDisabled}
                    errors={errors}
                  />
                )}
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </Section>
    </>
  )
}
