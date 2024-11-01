'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import Center from '@/app/components/Center'
import Review from '@/app/components/Review'
import Header from '@/app/header/page'
import CartIcon from '@/app/icons/CartIcon'
import styled from 'styled-components'
import { useParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import ProductImages from '@/app/components/ProductImages'
import Button from '@/app/components/Button'
import Title from '@/app/components/Title'
import flyToCart from '@/app/components/FlyToCart'
import Loading from '@/app/components/Loading'
import { addProductToCart } from '@/app/redux/cartActions'
import { fetchProducts } from '@/app/redux/productActions'

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

export default function ProductPage() {
  const params = useParams()
  const { id } = params

  const products = useSelector((state) => state.products.products)
  const product = products.find((product) => product._id === id)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const dispatch = useDispatch()

  const buttonRef = useRef(null)
  const isInViewRef = useRef(null)
  const isInView = useInView(isInViewRef, { once: true })

  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [loading])

  useEffect(() => {
    if (!product && products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [product, products, dispatch])

  const handleAddProductToCart = async (e, productId) => {
    NProgress.start()

    if (buttonRef.current) {
      flyToCart(e, buttonRef.current)
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    dispatch(addProductToCart(productId))
    NProgress.done()
  }

  return (
    <>
      <Header />
      <motion.div
        ref={isInViewRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Center>
          <ColWrapper>
            {error && (
              <Center>
                <div>Error: {error}</div>
              </Center>
            )}
            {loading && (
              <Center>
                <Loading />
              </Center>
            )}
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
                <div ref={buttonRef} >
                  <Button $primary $product onClick={(e) => handleAddProductToCart(e, product)}>
                    <CartIcon />
                    Add to cart
                  </Button>
                </div>
              </PriceRow>
            </Info>
          </ColWrapper>
          <Review reviews={product?.reviews} productId={product?._id} />
        </Center>
      </motion.div>
    </>
  )
}
