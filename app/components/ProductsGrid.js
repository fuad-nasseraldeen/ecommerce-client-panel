'use client'
import styled from 'styled-components'
import ProductBox from '@/app/components/ProductBox'
import { useEffect, useState, useRef } from 'react'
import { BlurOverlay } from '@/app/components/BlurOverlay'
import { LoadingIndicator } from '@/app/components/Spinner'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Center from '@/app/components/Center'
import Button from '@/app/components/Button'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 50px;
  }
  padding-bottom: 100px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export default function ProductsGrid({ products }) {
  const productsPerPage = 10
  const numberOfPages = Math.ceil(products?.length / productsPerPage)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef(null)

  // Calculate the start and end indices based on the current page
  const indexStartOfPage = (currentPage - 1) * productsPerPage
  const indexEndOfPage = indexStartOfPage + productsPerPage
  const productsOfCurrentPage = products?.slice(indexStartOfPage, indexEndOfPage)

  // Scroll to top of the grid when currentPage changes
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentPage])

  // Reset to the first page if products list changes
  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage(1)
    }
  }, [products])

  // NProgress loading bar
  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [loading])

  const handlePreviousPage = () => {
    setLoading(true)
    setTimeout(() => {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1)
      }
      setLoading(false)
    }, 500) // Set a brief delay for loading indicator to show
  }

  const handleNextPage = () => {
    setLoading(true)
    setTimeout(() => {
      if (currentPage < numberOfPages) {
        setCurrentPage((nextPage) => nextPage + 1)
      }
      setLoading(false)
    }, 500) // Set a brief delay for loading indicator to show
  }

  if (loading)
    return (
      <>
        <BlurOverlay />
        <LoadingIndicator />
      </>
    )

  return (
    <>
      <StyledProductsGrid ref={gridRef}>
        {productsOfCurrentPage?.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </StyledProductsGrid>
      <ButtonWrapper>
        <Button $block $primary $widthTwentyPer onClick={handlePreviousPage} $disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          {'  '}
          Page {currentPage} of {numberOfPages}
          {'  '}
        </span>
        <Button $block $primary $widthTwentyPer onClick={handleNextPage} $disabled={currentPage === numberOfPages}>
          Next
        </Button>
      </ButtonWrapper>
    </>
  )
}
