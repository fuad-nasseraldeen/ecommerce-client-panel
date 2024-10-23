'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Center from '@/app/components/Center'
import Review from '@/app/components/Review'
import Header from '@/app/header/page'
import CartIcon from '@/icons/CartIcon'
import styled from 'styled-components'
import { useParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import ProductImages from '@/app/components/ProductImages'
import Button from '@/app/components/Button'
import Title from '@/app/components/Title'

import { BlurOverlay } from '@/app/components/BlurOverlay'
import { LoadingIndicator } from '@/app/components/Spinner'

export default function ProductPage() {
  const params = useParams()
  const { id } = params

  const products = useSelector((state) => state.products.products)
  const product = products.find((product) => product._id === id)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
      grid-template-columns: 1.3fr 0.7fr;
    }
    gap: 40px;
    margin: 40px 0;
  `
  const PriceRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
  `
  const Price = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.06rem;
  `
  const Desc = styled.div`
    letter-spacing: 0.05rem;
  `
  const Info = styled.div`
    padding-top: 20px;
  `
  const Brand = styled.span`
    font-size: 1rem;
    font-weight: 500;
    display: block;
    margin-top: 20px;
  `
  const Tags = styled.div`
    margin-top: 20px;
    span {
      display: inline-block;
      background: #e0e0e0;
      padding: 5px;
      border-radius: 5px;
      margin: 5px;
    }
  `
  const ReturnPolicy = styled.div`
    margin-top: 20px;
    font-size: 0.9rem;
    color: #666;
  `
  const ShippingInfo = styled.div`
    margin-top: 10px;
    font-size: 0.9rem;
    color: #666;
  `
  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [loading])

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
        <ColWrapper>
          <ProductImages images={product?.images} />
          <Info>
            <Title>{product?.title}</Title>
            <Desc>{product?.description}</Desc>
            <Brand>Brand: {product?.brand}</Brand>
            <Tags>
              {product?.tags?.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </Tags>
            <ReturnPolicy>Return Policy: {product?.returnPolicy}</ReturnPolicy>
            <ShippingInfo>Shipping Information: {product?.shippingInformation}</ShippingInfo>
            <PriceRow>
              <div>
                <Price>${product?.price}</Price>
              </div>
              <div>
                <Button $primary $product onClick={() => addProduct(product?._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </Info>
        </ColWrapper>
        <Review
          reviews={JSON.parse(JSON.stringify(product)).reviews}
          productId={JSON.parse(JSON.stringify(product))._id}
        />
      </Center>
    </>
  )
}
