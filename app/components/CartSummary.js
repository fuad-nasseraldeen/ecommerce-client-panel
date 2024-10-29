import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Button from './Button'
import { goToPayment } from '@/app/util/checkoutUtils'
import Center from '@/app/components/Center'

const CartSummaryWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #aaa;
  border-top: 1px solid #e5e5e5;
  padding: 20px 50px;
  display: grid;
  grid-template-columns: 0.5fr 0.8fr 0.8fr;
  gap: 20px;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 2px;
  gap: 5px;
`

const Greeting = styled.div`
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 2px;
`
const Price = styled.div`
  font-weight: bold;
`

export function CartSummary() {
  const cart = useSelector((state) => state.cart.items)
  const checkoutDetails = useSelector((state) => state.checkout.details[0])
  const total = cart?.reduce((acc, product) => acc + product.price * product.quantity, 0) || '0.00'
  const items = cart?.reduce((acc, product) => acc + product.quantity, 0) || 0

  async function handlePayment() {
    if (checkoutDetails && Object.keys(checkoutDetails).length > 0) {
      await goToPayment({
        name: checkoutDetails.name,
        email: checkoutDetails.email,
        city: checkoutDetails.city,
        postalCode: checkoutDetails.postalCode,
        streetAddress: checkoutDetails.streetAddress,
        country: checkoutDetails.country,
        cart,
      })
    }
  }

  return (
    <Center>
      <CartSummaryWrapper>
        <Greeting>
          {`Hi Mr ${checkoutDetails?.name}`}
          <br />
          {`${checkoutDetails?.email}`}
        </Greeting>
        <CartInfo>
          <div>Total items: {items}</div>
          <Price>Total Price: ${parseFloat(total).toFixed(2)}</Price>
        </CartInfo>
        <Button $checkout $primary $block onClick={handlePayment}>
          Proceed to Checkout
        </Button>
      </CartSummaryWrapper>
    </Center>
  )
}
