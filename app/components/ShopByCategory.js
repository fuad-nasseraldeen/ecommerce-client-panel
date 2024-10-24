'use client'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { categoriesImg } from '../util/util'
import { fetchProductsByCategory, fetchProducts } from '../redux/productActions'
import Link from 'next/link'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Section = styled.section`
  padding: 3.5rem 0;
  background-color: white;
  color: #0b1727;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 10;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: start;
  }
`

const Title = styled.h2`
  font-size: 2rem;
  line-height: 1;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-left: 0.75rem;

  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`

const ScrollContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  white-space: nowrap;
  gap: 1.5rem;
  padding-bottom: 1rem;
  @media screen and (min-width: 450px) {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 20px;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }
`

const ProductWrapper = styled.div`
  display: inline-block;
  flex: 0 0 auto;
  width: 200px; /* Fixed width for each item */
`

const ProductItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  padding: 10px;
  min-width: auto;
  text-align: center;
  transition: 0.3s;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const ProductImageWrapper = styled.div`
  width: 8rem; /* Reduce the wrapper size */
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem; /* Add padding for better spacing */
  border: 1px solid #eee; /* Add a subtle border */
  border-radius: 50%; /* Keep it round */
  background-color: #f8f8f8; /* Add a background color */
  margin: 0 auto;
`

const ProductImage = styled.img`
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
`

const ProductTitle = styled.h2`
  font-family: 'Kanit', sans-serif;
  font-weight: 900;
  font-style: normal;
  font-size: 1.125rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.5;
  color: #0d3d29;
`

export default function ShopByCategory() {
  const categories = useSelector((state) => state.products.categories)

  const products = useSelector((state) => state.products.products)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('')

  if (!categories || categories.length === 0) {
    return <div>No categories available.</div>
  }

  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [loading])

  if (error) {
    return <div>Error: {error}</div>
  }
  const handleSelectedCategory = (categoryId) => {
    dispatch(fetchProductsByCategory(categoryId))
  }

  return (
    <Section>
      <Container>
        <TitleWrapper>
          <Title>Shop By Category</Title>
        </TitleWrapper>
        <ScrollContainer>
          {categories.map((category) => {
            // Find the corresponding image
            const categoryImg = categoriesImg.find((_category) => _category.name === category.name)
            const imgSrc = categoryImg ? categoryImg.img : '/path/to/placeholder.png' // Use a placeholder image if not found
            const url = '/products/category/' + category._id
            return (
              <ProductWrapper key={category._id}>
                <ProductItemWrapper href={url} onClick={() => handleSelectedCategory(category._id)}>
                  <ProductImageWrapper>
                    <ProductImage src={imgSrc} alt={category.name} loading='lazy' />
                  </ProductImageWrapper>
                  <ProductTitle>{category.name}</ProductTitle>
                </ProductItemWrapper>
              </ProductWrapper>
            )
          })}
        </ScrollContainer>
      </Container>
    </Section>
  )
}
