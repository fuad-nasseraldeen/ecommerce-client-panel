'use client'
import styled from 'styled-components'
import ProductBox from '@/app/components/ProductBox'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.4rem;
  }
  padding-bottom: 4rem;
`
export default function ProductsGrid({ products }) {
  return (
    <>
      <StyledProductsGrid>
        {products?.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </StyledProductsGrid>
    </>
  )
}
