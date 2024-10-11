'use client'
import styled from 'styled-components'
import Featured from '../featured/page'
import Center from '../components/Center'
import ProductBox from '../components/ProductBox'
import { useContext } from 'react'
import { CartContext } from '../components/CartContext'

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-top: 30px;
`
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`
export default function NewProducts({ products }) {
  const { addProduct } = useContext(CartContext)

  function handleAddFeaturedToCart(productId) {
    addProduct(productId)
  }

  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product} addFeaturedToCart={handleAddFeaturedToCart} />
          ))}
      </ProductsGrid>
    </Center>
  )
}
