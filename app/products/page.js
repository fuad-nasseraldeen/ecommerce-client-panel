'use client'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProducts, fetchProductsByCategory } from '@/app/redux/productActions'
import styled from 'styled-components'

import Header from '@/app/header/page'
import { applySort } from '@/app/util/util'

import ProductsGrid from '@/app/components/ProductsGrid'
import Sidebar from '@/app/components/SideBar'
import Search from '@/app/components/Search'
import Title from '@/app/components/Title'
import { useDebounce } from '@/app/hooks/useDebounce'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Center from '../components/Center'
import { BlurOverlay } from '@/app/components/BlurOverlay'
import { LoadingIndicator } from '@/app/components/Spinner'

const Container = styled.div`
  display: grid;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.4fr 1.6fr;
    padding: 50px;
    gap: 20px;
  }
  grid-template-columns: 1fr;
  padding: 10px;
  gap: 5px;
  padding-bottom: 140px;
`
const Content = styled.div`
  padding-bottom: 140px;`

export default function ProductsPage() {
  const dispatch = useDispatch()

  const { products, loading, error, productsByCategory } = useSelector((state) => state.products)

  const [sortOption, setSortOption] = useState('sort1')
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loadingProduct, setLoadingProduct] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 0.3) // 300ms debounce delay

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [loading])
  useEffect(() => {
    if (!loading && !loadingProduct) {
      setLoadingProduct(false)
    }
  }, [loading, productsByCategory, products])
  const sortedProducts = useMemo(() => {
    const productsToSort = productsByCategory?.length > 0 && selectedCategoryId ? productsByCategory : products

    const filteredProducts = productsToSort.filter((product) => {
      return (
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase())))
      )
    })

    return applySort(filteredProducts, sortOption)
  }, [sortOption, products, productsByCategory, selectedCategoryId, searchQuery, debouncedSearchQuery])

  const handleSortChange = (value) => {
    setLoadingProduct(true)
    setSortOption(value)
    setTimeout(() => {
      setLoadingProduct(false)
    }, 1000)
  }

  const handleCategorySortChange = (categoryId) => {
    setLoadingProduct(true)
    if (selectedCategoryId !== categoryId) {
      setSelectedCategoryId(categoryId)
      dispatch(fetchProductsByCategory(categoryId))
    }
    setTimeout(() => {
      setLoadingProduct(false)
    }, 1000)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const renderContent = () => {
    if (loading || loadingProduct)
      return (
        <>
          <BlurOverlay />
          <LoadingIndicator />
        </>
      )
    if (error) return <div>Error: {error}</div>

    if (sortedProducts.length === 0) {
      return <div>No products available</div>
    }

    return <ProductsGrid products={sortedProducts} />
  }

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <Search onSearch={handleSearchChange} />
      </Center>

      <Container>
        <Sidebar handleSortChange={handleSortChange} handleCategorySort={handleCategorySortChange} />
        <Content>{renderContent()}</Content>
      </Container>
    </>
  )
}
