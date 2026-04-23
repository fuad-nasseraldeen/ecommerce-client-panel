'use client'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import ButtonLink from './ButtonLink'
import Center from '@/app/components/Center'
import { selectCartCount, selectCartTotal, selectCheckoutDetails } from '@/app/redux/selectors'
import { usePathname } from 'next/navigation'

const CartSummaryWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.93);
  border-top: 1px solid var(--border);
  padding: 0.7rem 0;
  backdrop-filter: blur(8px);
  z-index: 990;

  @media screen and (max-width: 760px) {
    display: none;
  }
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.9rem;
  align-items: center;
`

const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
`

const Entity = styled.span`
  font-weight: 700;
  color: var(--text-primary);
`

export function CartSummary() {
  const pathname = usePathname()
  const items = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)
  const checkoutDetails = useSelector(selectCheckoutDetails)

  if (!items || pathname === '/cart') return null

  return (
    <CartSummaryWrapper>
      <Center>
        <SummaryGrid>
          <CartInfo>
            {checkoutDetails?.name ? (
              <div>
                Hi <Entity>{checkoutDetails.name}</Entity>
              </div>
            ) : (
              <div>Ready to checkout?</div>
            )}
            <div>{checkoutDetails?.email || 'Review your cart and continue securely.'}</div>
          </CartInfo>

          <CartInfo>
            <div>Total items: {items}</div>
            <div>
              Total price: <Entity>${total.toFixed(2)}</Entity>
            </div>
          </CartInfo>

          <ButtonLink href='/cart' $checkout $black>
            Proceed to checkout
          </ButtonLink>
        </SummaryGrid>
      </Center>
    </CartSummaryWrapper>
  )
}
