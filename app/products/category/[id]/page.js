'use client'
import { useSelector } from 'react-redux'
import Center from '@/app/components/Center'
import Header from '@/app/header/page'
import Title from '@/app/components/Title'
import ProductsGrid from '@/app/components/ProductsGrid'
import { useParams } from 'next/navigation'
import styled from 'styled-components'

import Loading from '@/app/components/Loading'

const Section = styled.section`
  padding: 1.4rem 0 4rem;
`

const Card = styled.div`
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: #fff;
  padding: 1rem;
`

const StateMessage = styled.p`
  color: var(--text-secondary);
`

export default function ProductPageByCategory() {
  const categories = useSelector((state) => state.products.categories)
  const products = useSelector((state) => state.products.productsByCategory)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const params = useParams()
  const { id } = params

  const category = categories?.find((_category) => _category._id === id)
  const categorySelectedName = category?.name || 'Category Not Found'

  return (
    <>
      <Header />
      <Section>
        <Center>
          {loading && <Loading />}
          {error && <StateMessage>Error: {error}</StateMessage>}
          <Title>{categorySelectedName} products</Title>
          <Card>
            {products?.length > 0 ? <ProductsGrid products={products} /> : <StateMessage>No products found for this category.</StateMessage>}
          </Card>
        </Center>
      </Section>
    </>
  )
}
