'use client'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearProductsByCategory, fetchCategories, fetchProducts, fetchProductsByCategory } from '@/app/redux/productActions'
import styled from 'styled-components'
import Header from '@/app/header/page'
import { applySort, sortByOptions } from '@/app/util/util'
import ProductsGrid from '@/app/components/ProductsGrid'
import Sidebar from '@/app/components/SideBar'
import Search from '@/app/components/Search'
import Title from '@/app/components/Title'
import { useDebounce } from '@/app/hooks/useDebounce'
import Center from '@/app/components/Center'
import Button from '@/app/components/Button'
import Loading from '@/app/components/Loading'

const PageSection = styled.section`
  padding: 1.4rem 0 4rem;
`

const ControlsWrapper = styled.div`
  display: grid;
  gap: 0.7rem;
  margin: 1rem 0 1.2rem;

  @media (min-width: 900px) {
    display: none;
  }
`

const Select = styled.select`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: #fff;
  padding: 0.75rem;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media screen and (min-width: 900px) {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 1.2rem;
  }
`

const ContentCard = styled.div`
  background: #fff;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  padding: 1rem;
`

const StateMessage = styled.p`
  color: var(--text-secondary);
  padding: 1rem 0;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.2rem;
`

const PaginationText = styled.span`
  color: var(--text-secondary);
  font-size: 0.92rem;
`

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { products, loading, error, productsByCategory, categories } = useSelector((state) => state.products)

  const productsPerPage = 10
  const [sortOption, setSortOption] = useState('sort1')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedSearchQuery = useDebounce(searchQuery, 250)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  const sourceProducts = useMemo(() => {
    if (selectedCategoryId) return productsByCategory || []
    return products || []
  }, [selectedCategoryId, productsByCategory, products])

  const searchedProducts = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase()
    if (!query) return sourceProducts

    return sourceProducts.filter((product) => {
      const title = product.title?.toLowerCase() || ''
      const brand = product.brand?.toLowerCase() || ''
      const hasTag = product.tags?.some((tag) => tag.toLowerCase().includes(query))
      return title.includes(query) || brand.includes(query) || hasTag
    })
  }, [sourceProducts, debouncedSearchQuery])

  const sortedProducts = useMemo(() => applySort(searchedProducts, sortOption), [searchedProducts, sortOption])

  const numberOfPages = useMemo(() => Math.max(1, Math.ceil(sortedProducts.length / productsPerPage)), [sortedProducts.length])

  const productsToDisplay = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage
    return sortedProducts.slice(start, start + productsPerPage)
  }, [sortedProducts, currentPage])

  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage(1)
    }
  }, [numberOfPages, currentPage])

  const handleSortChange = (value) => {
    setSortOption(value)
    setCurrentPage(1)
  }

  const handleCategorySortChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setCurrentPage(1)

    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId))
    } else {
      dispatch(clearProductsByCategory())
    }
  }

  const renderContent = () => {
    if (error) return <StateMessage>Error: {error}</StateMessage>
    if (!productsToDisplay?.length) return <StateMessage>No products available.</StateMessage>
    return <ProductsGrid products={productsToDisplay} />
  }

  return (
    <>
      <Header />
      <PageSection>
        <Center>
          <Title>All products</Title>
          <Search onSearch={setSearchQuery} />

          <ControlsWrapper>
            <Select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
              {sortByOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  Sort: {option.label}
                </option>
              ))}
            </Select>

            <Select value={selectedCategoryId} onChange={(e) => handleCategorySortChange(e.target.value)}>
              <option value=''>All categories</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </ControlsWrapper>

          {loading ? (
            <Loading />
          ) : (
            <Container>
              <Sidebar handleSortChange={handleSortChange} handleCategorySort={handleCategorySortChange} />
              <ContentCard>
                {renderContent()}

                <ButtonWrapper>
                  <Button $black $disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                    Previous
                  </Button>
                  <PaginationText aria-live='polite'>
                    Page {currentPage} of {numberOfPages}
                  </PaginationText>
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numberOfPages))}
                    $black
                    $disabled={currentPage === numberOfPages}
                  >
                    Next
                  </Button>
                </ButtonWrapper>
              </ContentCard>
            </Container>
          )}
        </Center>
      </PageSection>
    </>
  )
}
