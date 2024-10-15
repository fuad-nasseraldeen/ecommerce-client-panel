'use client'
import { useContext } from 'react'
import CartIcon from '@/icons/CartIcon'
import styled from 'styled-components'

import { CartContext } from '@/app/components/CartContext'
import ProductImages from '@/app/components/ProductImages'
import Button from '@/app/components/Button'
import Title from '@/app/components/Title'
import WhiteBox from '@/app/components/WhiteBox'

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
const Price = styled.span`
  font-size: 1.4rem;
`

export default function ProductClientPage({ product }) {
  const { addProduct } = useContext(CartContext)
  return (
    <ColWrapper>
      <WhiteBox>
        <ProductImages images={product.images} />
      </WhiteBox>
      <div>
        <Title>{product.title}</Title>
        <p>{product.description}</p>
        <PriceRow>
          <div>
            <Price>${product.price}</Price>
          </div>
          <div>
            <Button $primary onClick={() => addProduct(product._id)}>
              <CartIcon />
              Add to cart
            </Button>
          </div>
        </PriceRow>
      </div>
    </ColWrapper>
  )
}
