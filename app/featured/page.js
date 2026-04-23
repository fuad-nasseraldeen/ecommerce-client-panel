'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import Button from '@/app/components/Button'
import ButtonLink from '@/app/components/ButtonLink'
import CartIcon from '@/app/icons/CartIcon'
import flyToCart from '@/app/components/FlyToCart'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../redux/cartActions'

const Bg = styled.section`
  color: #fff;
  padding: 2.5rem 0;
`

const Surface = styled.div`
  border-radius: var(--radius-lg);
  background: linear-gradient(130deg, #0d2134 0%, #132d44 52%, #16424f 100%);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 1.2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    padding: 2.6rem 2.4rem;
  }
`

const Column = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-size: clamp(1.8rem, 1.1rem + 2.2vw, 3.2rem);
`

const Desc = styled.p`
  color: rgba(236, 245, 255, 0.84);
  font-size: 0.96rem;
  margin-top: 1rem;
  line-height: 1.65;
  max-width: 52ch;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.4rem;
`

const ProductImage = styled.img`
  width: 100%;
  max-height: 340px;
  object-fit: contain;
  filter: drop-shadow(0 24px 30px rgba(0, 0, 0, 0.35));
`

const ProductImagePlaceholder = styled.div`
  width: 100%;
  min-height: 240px;
  border-radius: var(--radius-md);
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 70%),
    linear-gradient(140deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

export default function Featured({ product }) {
  const dispatch = useDispatch()
  const whiteBoxRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const productUrl = useMemo(() => (product?._id ? `/product/${product._id}` : '/products'), [product?._id])
  const featuredImage = product?.thumbnail || product?.images?.[0] || null

  const addToCart = (e) => {
    if (!product) return
    flyToCart(e, whiteBoxRef.current)
    dispatch(addProductToCart(product))
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
    >
      <Bg>
        <Center>
          <Surface>
            <ColumnsWrapper>
              <Column>
                <div>
                  <Title>{product?.title || 'Discover your next favorite tech pick'}</Title>
                  <Desc>
                    {product?.description ||
                      'Curated gadgets with trusted quality, faster checkout, and everything you need for a smoother shopping experience.'}
                  </Desc>
                  <ButtonsWrapper>
                    <ButtonLink href={productUrl} $white $outline>
                      View details
                    </ButtonLink>
                    <Button $white onClick={addToCart}>
                      <CartIcon />
                      Add to cart
                    </Button>
                  </ButtonsWrapper>
                </div>
              </Column>
              <Column>
                {featuredImage ? (
                  <ProductImage ref={whiteBoxRef} src={featuredImage} alt={product.title || 'Featured product'} />
                ) : (
                  <ProductImagePlaceholder ref={whiteBoxRef} />
                )}
              </Column>
            </ColumnsWrapper>
          </Surface>
        </Center>
      </Bg>
    </motion.div>
  )
}
