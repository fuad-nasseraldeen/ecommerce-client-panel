'use client'
import {  useSelector } from 'react-redux'
import Center from '@/app/components/Center'
import Header from '@/app/header/page'
import Title from '@/app/components/Title'
import ProductsGrid from '@/app/components/ProductsGrid'
import { useParams } from 'next/navigation'

import Loading from '@/app/components/Loading'

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
      <Center>
        {error && <div>Error: {error}</div>}
        {loading && <Loading />}
        <Title>All products in {categorySelectedName} Category</Title>
        {products?.length > 0 ? <ProductsGrid products={products} /> : <div>No products found for this category.</div>}
      </Center>
    </>
  )
}
