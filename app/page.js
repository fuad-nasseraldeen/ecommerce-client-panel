'use client'
import Header from './header/page'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchNewArrivals, fetchCategories, fetchHomePageProduct } from '@/app/redux/productActions'
import NewProducts from '@/app/newProducts/NewProducts'
import ShopByCategory from '@/app/components/ShopByCategory'
import Featured from '@/app/featured/page'
import { getRandomProduct } from '@/app/util/generateRandomProduct'
import Loading from '@/app/components/Loading'
import Center from '@/app/components/Center'
export default function HomePage() {
  const dispatch = useDispatch()
  const { products, newArrivals, categories, homePageProduct, loading } = useSelector((state) => state.products)
  const [isRandomProductGenerated, setIsRandomProductGenerated] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchNewArrivals())
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (!isRandomProductGenerated && products.length > 0) {
      const productHomePage = getRandomProduct(products)
      if (productHomePage) {
        dispatch(fetchHomePageProduct(productHomePage._id))
      }
      setIsRandomProductGenerated(true)
    }
  }, [products, dispatch, isRandomProductGenerated])

  if (loading)
    return (
      <Center>
        <Loading/>
      </Center>
    )

  return (
    <>
      <Header />
      <Featured product={homePageProduct} />
      <ShopByCategory categories={categories} />
      <NewProducts products={newArrivals} />
    </>
  )
}
