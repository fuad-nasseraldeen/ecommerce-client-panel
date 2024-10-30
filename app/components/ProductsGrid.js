'use client'
import styled from 'styled-components'
import ProductBox from '@/app/components/ProductBox'
import { useEffect, useState } from 'react'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 50px;
  }
  padding-bottom: 100px;
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
