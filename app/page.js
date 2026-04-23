'use client'
import Header from './header/page'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchNewArrivals, fetchCategories, fetchHomePageProduct } from '@/app/redux/productActions'
import NewProducts from '@/app/newProducts/NewProducts'
import ShopByCategory from '@/app/components/ShopByCategory'
import Featured from '@/app/featured/page'
import { getRandomProduct } from '@/app/util/generateRandomProduct'
import Center from '@/app/components/Center'
import styled from 'styled-components'

const HomeWrapper = styled.main`
  padding-bottom: 4.5rem;
`

const SectionSpacing = styled.div`
  margin-top: 1rem;
`

const LoadingText = styled.p`
  color: var(--text-secondary);
  padding: 2rem 0;
`

export default function HomePage() {
  const dispatch = useDispatch()
  const { products, newArrivals, homePageProduct, loading } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchNewArrivals())
    dispatch(fetchCategories())
  }, [dispatch])

  const selectedFeaturedProduct = useMemo(() => {
    if (homePageProduct) return homePageProduct
    if (!products?.length) return null
    return getRandomProduct(products)
  }, [homePageProduct, products])

  useEffect(() => {
    if (!homePageProduct && selectedFeaturedProduct?._id) {
      dispatch(fetchHomePageProduct(selectedFeaturedProduct._id))
    }
  }, [homePageProduct, selectedFeaturedProduct, dispatch])

  return (
    <>
      <Header />
      <HomeWrapper>
        <Featured product={selectedFeaturedProduct} />

        <Center>
          <SectionSpacing>
            <ShopByCategory />
          </SectionSpacing>

          {loading && !newArrivals?.length ? <LoadingText>Loading products...</LoadingText> : <NewProducts products={newArrivals} />}
        </Center>
      </HomeWrapper>
    </>
  )
}
