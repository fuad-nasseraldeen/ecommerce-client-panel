'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
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
import Center from '@/app/components/Center'
import Button from '@/app/components/Button'
import { BlurOverlay } from '@/app/components/BlurOverlay'
import { LoadingIndicator } from '@/app/components/Spinner'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Mobile view, single column */
  gap: 5px;
  padding: 10px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.4fr 1.6fr;
    grid-template-rows: auto auto;
    padding: 50px 50px 140px 50px;
    gap: 20px;
  }
`
const Content = styled.div``
const ButtonWrapper = styled.div`
  display: flex;
  grid-column: 1 / -1;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { products, loading, error, productsByCategory } = useSelector((state) => state.products)
  const productsPerPage = 10
  const [sortOption, setSortOption] = useState('sort1')
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const gridRef = useRef(null)

  const numberOfPages = useMemo(() => {
    const totalProducts = selectedCategoryId ? productsByCategory.length : products.length
    return Math.ceil(totalProducts / productsPerPage)
  }, [products, productsByCategory, selectedCategoryId])

  const productsToDisplay = useMemo(() => {
    const sourceProducts = selectedCategoryId ? productsByCategory : products
    return sourceProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
  }, [productsByCategory, selectedCategoryId, products, currentPage])

  const sortedProducts = useMemo(() => {
    const filteredProducts = productsToDisplay.filter((product) => {
      return (
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase())))
      )
    })
    return applySort(filteredProducts, sortOption)
  }, [sortOption, productsToDisplay, debouncedSearchQuery])

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [])

  useEffect(() => {
    loading ? NProgress.start() : NProgress.done()
  }, [loading])

  const handleSortChange = (value) => setSortOption(value)

  const handleCategorySortChange = (categoryId) => {
    if (selectedCategoryId !== categoryId) {
      setSelectedCategoryId(categoryId)
      dispatch(fetchProductsByCategory(categoryId))
      setCurrentPage(1)
    }
  }

  const renderContent = () => {
    if (loading)
      return (
        <>
          <BlurOverlay />
          <LoadingIndicator />
        </>
      )
    if (error) return <div>Error: {error}</div>
    if (sortedProducts.length === 0) return <div>No products available</div>
    return <ProductsGrid ref={gridRef} products={sortedProducts} />
  }

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <Search onSearch={setSearchQuery} />
      </Center>
      <Container>
        <Sidebar handleSortChange={handleSortChange} handleCategorySort={handleCategorySortChange} />
        <Content>{renderContent()}</Content>
        <ButtonWrapper>
          <Button $black $disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </Button>
          <span aria-live='polite'>
            Page {currentPage} of {numberOfPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))}
            $black
            $disabled={currentPage === numberOfPages}
          >
            Next
          </Button>
        </ButtonWrapper>
      </Container>
    </>
  )
}
