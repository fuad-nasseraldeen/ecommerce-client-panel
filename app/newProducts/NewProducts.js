'use client'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import ProductsGrid from '@/app/components/ProductsGrid'

const Title = styled.h2`
  font-size: clamp(1.45rem, 1.12rem + 1.15vw, 2rem);
  margin: 2.2rem 0 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`
export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  )
}
