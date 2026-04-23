'use client'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesImg } from '../util/util'
import { fetchProductsByCategory } from '../redux/productActions'
import Link from 'next/link'

const Section = styled.section`
  padding: 2.3rem 0 1.9rem;
`

const Container = styled.div`
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: clamp(1.45rem, 1.12rem + 1.15vw, 2rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1.2rem;
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;

  @media screen and (min-width: 680px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
`

const CategoryCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  gap: 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 1rem 0.7rem;
  min-height: 140px;
  transition: transform 0.16s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
    border-color: #bfcddd;
  }
`

const ProductImageWrapper = styled.div`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 999px;
  background: linear-gradient(180deg, #f8fcff 0%, #edf4fc 100%);
  border: 1px solid #d8e7f2;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProductImage = styled.img`
  max-width: 72%;
  max-height: 72%;
  object-fit: contain;
`

const ProductTitle = styled.h3`
  font-family: 'Kanit', sans-serif;
  font-weight: 700;
  font-size: 0.96rem;
  line-height: 1.25;
  color: #12324a;
`

const StateMessage = styled.p`
  color: var(--text-secondary);
`

export default function ShopByCategory() {
  const categories = useSelector((state) => state.products.categories)
  const error = useSelector((state) => state.products.error)
  const dispatch = useDispatch()

  const handleSelectedCategory = (categoryId) => {
    dispatch(fetchProductsByCategory(categoryId))
  }

  return (
    <Section>
      <Container>
        <Title>Shop by category</Title>
        {error && <StateMessage>Error: {error}</StateMessage>}
        {(!categories || categories.length === 0) && <StateMessage>No categories available.</StateMessage>}

        <CategoriesGrid>
          {categories?.map((category) => {
            const categoryImg = categoriesImg?.find((_category) => _category.name === category?.name)
            const url = '/products/category/' + category?._id

            return (
              <CategoryCard key={category?._id} href={url} onClick={() => handleSelectedCategory(category?._id)}>
                <ProductImageWrapper>
                  <ProductImage src={categoryImg?.img} alt={category?.name} loading='lazy' />
                </ProductImageWrapper>
                <ProductTitle>{category?.name}</ProductTitle>
              </CategoryCard>
            )
          })}
        </CategoriesGrid>
      </Container>
    </Section>
  )
}
