'use client'
import { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
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
  gap: 1rem;

  @media screen and (min-width: 680px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const CategoryCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: left;
  gap: 0.95rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: linear-gradient(165deg, #ffffff 0%, #f4f8fd 100%);
  padding: 0.7rem;
  min-height: 215px;
  transition: transform 0.16s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: #b9cadf;
  }
`

const ProductImageWrapper = styled.div`
  width: 100%;
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(155deg, #eef5ff 0%, #dde9f6 100%);
  border: 1px solid #d6e3f1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.05);
  }
`

const ProductTitle = styled.h3`
  font-family: 'Kanit', sans-serif;
  font-weight: 700;
  font-size: 1.02rem;
  line-height: 1.25;
  color: #12324a;
`

const ProductCaption = styled.span`
  color: #5e6f81;
  font-size: 0.86rem;
  font-weight: 500;
`

const EmptyImage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #59708b;
  font-weight: 700;
  letter-spacing: 0.06em;
`

const StateMessage = styled.p`
  color: var(--text-secondary);
`

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

const SkeletonCard = styled.div`
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: linear-gradient(165deg, #ffffff 0%, #f4f8fd 100%);
  padding: 0.7rem;
  min-height: 215px;
`

const SkeletonImage = styled.div`
  width: 100%;
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(90deg, #e8eff8 25%, #f4f8fd 37%, #e8eff8 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.3s ease-in-out infinite;
`

const SkeletonText = styled.div`
  margin-top: 0.85rem;
  height: 16px;
  width: 60%;
  border-radius: 8px;
  background: linear-gradient(90deg, #e8eff8 25%, #f4f8fd 37%, #e8eff8 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.3s ease-in-out infinite;
`

export default function ShopByCategory() {
  const categories = useSelector((state) => state.products.categories)
  const products = useSelector((state) => state.products.products)
  const error = useSelector((state) => state.products.error)
  const categoriesLoaded = useSelector((state) => state.products.categoriesLoaded)
  const dispatch = useDispatch()

  const categoryProductImageMap = useMemo(() => {
    if (!categories?.length || !products?.length) return {}

    const productGroups = products.reduce((acc, product) => {
      const categoryId = product?.category ? String(product.category) : ''
      if (!categoryId) return acc
      if (!acc[categoryId]) acc[categoryId] = []
      acc[categoryId].push(product)
      return acc
    }, {})

    return categories.reduce((acc, category) => {
      const categoryId = String(category?._id || '')
      const categoryProducts = productGroups[categoryId] || []

      if (!categoryProducts.length) {
        acc[categoryId] = null
        return acc
      }

      const randomIndex = Math.floor(Math.random() * categoryProducts.length)
      const randomProduct = categoryProducts[randomIndex]
      acc[categoryId] = randomProduct?.thumbnail || randomProduct?.images?.[0] || null
      return acc
    }, {})
  }, [categories, products])

  const handleSelectedCategory = (categoryId) => {
    dispatch(fetchProductsByCategory(categoryId))
  }

  return (
    <Section>
      <Container>
        <Title>Shop by category</Title>
        {error && <StateMessage>Error: {error}</StateMessage>}
        {categoriesLoaded && (!categories || categories.length === 0) && <StateMessage>No categories available.</StateMessage>}

        {!categoriesLoaded ? (
          <CategoriesGrid>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={`skeleton-category-${index}`}>
                <SkeletonImage />
                <SkeletonText />
              </SkeletonCard>
            ))}
          </CategoriesGrid>
        ) : (
          <CategoriesGrid>
            {categories?.map((category) => {
              const categoryImg = categoryProductImageMap[String(category?._id)]
              const url = '/products/category/' + category?._id

              return (
                <CategoryCard key={category?._id} href={url} onClick={() => handleSelectedCategory(category?._id)}>
                  <ProductImageWrapper>
                    {categoryImg ? (
                      <ProductImage src={categoryImg} alt={category?.name} loading='lazy' />
                    ) : (
                      <EmptyImage>{category?.name?.slice(0, 2)?.toUpperCase() || 'NA'}</EmptyImage>
                    )}
                  </ProductImageWrapper>
                  <ProductTitle>{category?.name}</ProductTitle>
                  <ProductCaption>Explore collection</ProductCaption>
                </CategoryCard>
              )
            })}
          </CategoriesGrid>
        )}
      </Container>
    </Section>
  )
}
