'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import Center from '@/app/components/Center'
import Review from '@/app/components/Review'
import Header from '@/app/header/page'
import CartIcon from '@/app/icons/CartIcon'
import styled from 'styled-components'
import { useParams } from 'next/navigation'

import ProductImages from '@/app/components/ProductImages'
import Button from '@/app/components/Button'
import Title from '@/app/components/Title'
import flyToCart from '@/app/components/FlyToCart'
import Loading from '@/app/components/Loading'
import { addProductToCart } from '@/app/redux/cartActions'
import { fetchProducts } from '@/app/redux/productActions'

const Section = styled.section`
  padding: 1.2rem 0 4rem;
`

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.1rem;
  margin: 1rem 0;

  @media screen and (min-width: 900px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 1.5rem;
  }
`

const Card = styled.div`
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: #fff;
  padding: 1rem;
`

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 1rem;
`

const Price = styled.span`
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--brand-strong);
`

const Desc = styled.p`
  color: var(--text-secondary);
  line-height: 1.68;
`

const Info = styled.div`
  display: grid;
  gap: 0.65rem;
`

const Brand = styled.span`
  font-size: 0.96rem;
  font-weight: 600;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;

  span {
    display: inline-flex;
    align-items: center;
    background: #eff5fc;
    border: 1px solid #d6e3f1;
    color: #30455c;
    padding: 0.3rem 0.5rem;
    border-radius: 999px;
    font-size: 0.82rem;
  }
`

const Meta = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`

const StateMessage = styled.p`
  color: var(--text-secondary);
`

export default function ProductPage() {
  const params = useParams()
  const { id } = params

  const products = useSelector((state) => state.products.products)
  const product = useMemo(() => products.find((item) => item._id === id), [products, id])
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)

  const dispatch = useDispatch()

  const buttonRef = useRef(null)
  const isInViewRef = useRef(null)
  const isInView = useInView(isInViewRef, { once: true })

  useEffect(() => {
    if (!product && products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [product, products, dispatch])

  const handleAddProductToCart = (e) => {
    if (!product) return

    if (buttonRef.current) {
      flyToCart(e, buttonRef.current)
    }

    dispatch(addProductToCart(product))
  }

  return (
    <>
      <Header />
      <Section>
        <motion.div
          ref={isInViewRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Center>
            {error && <StateMessage>Error: {error}</StateMessage>}
            {loading && <Loading />}

            {product && (
              <ColWrapper>
                <Card>
                  <ProductImages images={product?.images} />
                </Card>

                <Card>
                  <Info>
                    <Title>{product?.title}</Title>
                    <Desc>{product?.description}</Desc>
                    <Brand>Brand: {product?.brand}</Brand>
                    <Tags>
                      {product?.tags?.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </Tags>
                    <Meta>Return Policy: {product?.returnPolicy || 'Standard policy applies.'}</Meta>
                    <Meta>Shipping Information: {product?.shippingInformation || 'Ships within 2-4 business days.'}</Meta>

                    <PriceRow>
                      <Price>${product?.price}</Price>
                      <div ref={buttonRef}>
                        <Button $primary $product onClick={handleAddProductToCart}>
                          <CartIcon />
                          Add to cart
                        </Button>
                      </div>
                    </PriceRow>
                  </Info>
                </Card>
              </ColWrapper>
            )}

            {product && <Review reviews={product?.reviews} productId={product?._id} />}
          </Center>
        </motion.div>
      </Section>
    </>
  )
}
