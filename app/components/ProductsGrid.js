'use client'
import styled from 'styled-components'
import ProductBox from '@/app/components/ProductBox'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 20px;
  padding-bottom: 50px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 50px;
  }
`

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map((product) => <ProductBox key={product._id} product={product} />)}
    </StyledProductsGrid>
  )
}
