'use client'
import Header from '../header/page'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import Button from '@/app/components/Button'
import { useEffect, useState } from 'react'
import { goToPayment } from '@/app/util/checkoutUtils'
import Table from '@/app/components/Table'
import Input from '@/app/components/Input'
import { handleDisabledProceedToCheckout } from '@/app/util/checkoutUtils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, removeProductFromCart, clearCart } from '@/app/redux/cartActions'
import { addCheckoutDetails, clearCheckoutDetails } from '@/app/redux/checkoutActions'
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`

const ProductInfoCell = styled.td`
  padding: 10px 0;
  width: 50%;
`

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 0.5rem;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`

const QuantityLabel = styled.span`
  padding: 0px 24px;
  display: block;
  @media screen and (min-width: 768px) {
    // display: inline-block;
    // text-align: center;
  }
`

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`
const Margin = styled.div`
  margin: 0.5rem;
`
export default function CartPage() {
  const cart = useSelector((state) => state.cart.items)
  const checkoutDetails = useSelector((state) => state.checkout.details[0])
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)
  const [isDisabled, SetIsDisabled] = useState(true)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true)
      if (cart?.length > 0) {
        dispatch(clearCart())
        dispatch(clearCheckoutDetails())
      }
    }
  }, [])
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

  function addProduct(product) {
    NProgress.start()
    dispatch(addProductToCart(product))
    NProgress.done()
  }

  function removeProduct(index) {
    NProgress.start()
    dispatch(removeProductFromCart(index))
    NProgress.done()
  }
  async function handlePayment() {
    await goToPayment({ name, email, city, postalCode, streetAddress, country, cart })
  }

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)

  const handleChange = (key, value) => {
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
  }
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cart?.length && <div>Your cart is empty</div>}
            {cart?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((product, index) => (
                    <tr key={product?._id + Math.random() * (100 - 1)}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product?.images?.[0]} alt='' />
                        </ProductImageBox>
                        {product?.title}
                      </ProductInfoCell>
                      <td>
                        <Margin>
                          <Button onClick={() => removeProduct(product)}>-</Button>
                        </Margin>
                        <QuantityLabel>{product?.quantity}</QuantityLabel>
                        <Margin>
                          <Button onClick={() => addProduct(product)}>+</Button>
                        </Margin>
                      </td>
                      <td>${(product.price * product.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cart?.length && (
            <Box>
              <h2>Order information</h2>
              <Input
                type='text'
                placeholder='Name'
                value={name}
                name='name'
                onChange={(ev) => handleChange('name', ev.target.value)}
              />
              <Input
                type='text'
                placeholder='Email'
                value={email}
                name='email'
                onChange={(ev) => handleChange('email', ev.target.value)}
              />
              <CityHolder>
                <Input
                  type='text'
                  placeholder='City'
                  value={city}
                  name='city'
                  onChange={(ev) => handleChange('city', ev.target.value)}
                />
                <Input
                  type='text'
                  placeholder='Postal Code'
                  value={postalCode}
                  name='postalCode'
                  onChange={(ev) => handleChange('postalCode', ev.target.value)}
                />
              </CityHolder>
              <Input
                type='text'
                placeholder='Street Address'
                value={streetAddress}
                name='streetAddress'
                onChange={(ev) => handleChange('streetAddress', ev.target.value)}
              />
              <Input
                type='text'
                placeholder='Country'
                value={country}
                name='country'
                onChange={(ev) => handleChange('country', ev.target.value)}
              />
              <Button $black $block $disabled={isDisabled} onClick={handlePayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}
