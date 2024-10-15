'use client'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import ProductsGrid from '@/app/components/ProductsGrid'

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  )
}
