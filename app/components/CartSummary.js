import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import ButtonLink from './ButtonLink'
import Center from '@/app/components/Center'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Loading from '@/app/components/Loading'

const CartSummaryWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(170, 170, 170, 0.95);
  border-top: 1px solid #e5e5e5;
  padding: 20px 50px;
  display: grid;
  grid-template-columns: 0.5fr 0.8fr 0.8fr;
  gap: 20px;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  @media screen and (max-width: 600px) {
  display: none;
  }
`

const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 2px;
  gap: 5px;
`

const Entity = styled.div`
  font-weight: bold;
`
const EntityWrapper = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`

export function CartSummary() {
  const cart = useSelector((state) => state.cart.items)
  const checkoutDetails = useSelector((state) => state.checkout.details[0])
  const total = cart?.reduce((acc, product) => acc + product.price * product.quantity, 0) || '0.00'
  const items = cart?.reduce((acc, product) => acc + product.quantity, 0) || 0
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    isLoading ? NProgress.start() : NProgress.done()
  }, [isLoading])

  const handleCheckout = () => {
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = '/cart'
      setIsLoading(false)
    }, 1000)
  }
  return (
    <Center>
      <CartSummaryWrapper>
        <CartInfo>
          {checkoutDetails?.name && <EntityWrapper>
            Hi <Entity>{checkoutDetails?.name}</Entity>
          </EntityWrapper>}
          <div>{checkoutDetails?.email}</div>
        </CartInfo>
        <CartInfo>
          <div>Total items: {items}</div>
          <Entity>Total Price: ${parseFloat(total).toFixed(2)}</Entity>
        </CartInfo>
        <ButtonLink href={'/cart'} onClick={handleCheckout} $checkout $black $block>
          Proceed to Checkout
        </ButtonLink>
        {
        isLoading && <Center>
        <Loading />
      </Center>
      }
      </CartSummaryWrapper>
    </Center>
  )
}
