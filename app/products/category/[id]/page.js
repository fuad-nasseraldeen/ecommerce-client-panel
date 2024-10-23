'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Center from '@/app/components/Center'
import Header from '@/app/header/page'
import Title from '@/app/components/Title'
import ProductsGrid from '@/app/components/ProductsGrid'
import { useParams } from 'next/navigation'
import { clearProductsByCategory } from '@/app/redux/productActions'

import { BlurOverlay } from '@/app/components/BlurOverlay'
import { LoadingIndicator } from '@/app/components/Spinner'

export default function ProductPageByCategory() {
  const categories = useSelector((state) => state.products.categories)
  const products = useSelector((state) => state.products.productsByCategory)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  // Ensure `id` is available before proceeding
  const category = categories.find((_category) => _category._id === id)
  const categorySelectedName = category ? category.name : 'Category Not Found'

  useEffect(() => {
    // return () => dispatch(clearProductsByCategory())
  }, [dispatch])

  if (loading)
    return (
      <>
        <BlurOverlay />
        <LoadingIndicator />
      </>
    )

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Header />
      <Center>
        <Title>All products in {categorySelectedName} Category</Title>
        {products?.length > 0 ? <ProductsGrid products={products} /> : <div>No products found for this category.</div>}
      </Center>
    </>
  )
}
