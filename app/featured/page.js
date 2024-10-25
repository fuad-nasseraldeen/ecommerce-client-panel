'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import Button from '@/app/components/Button'
import ButtonLink from '@/app/components/ButtonLink'
import CartIcon from '@/icons/CartIcon'
import flyToCart from '@/app/components/FlyToCart'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../redux/cartActions'

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    // max-width: 100%;
    // max-height: 220px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      // max-width: 100%;
    }
  }
`
const Column = styled.div`
  display: flex;
  align-items: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`

export default function Featured({ product }) {
  const dispatch = useDispatch()
  const whiteBoxRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const addToCart = (e, id) => {
    flyToCart(e, whiteBoxRef.current)
    dispatch(addProductToCart(id))
  }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Bg>
        <Center>
          <ColumnsWrapper ref={whiteBoxRef}>
            <Column>
              <div>
                <Title>{product?.title}</Title>
                <Desc>{product?.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink href={'/product/' + product?._id} $white $outline>
                    Read More
                  </ButtonLink>
                  <Button $white onClick={(e) => addToCart(e, product?._id)}>
                    <CartIcon />
                    Add to cart
                  </Button>
                </ButtonsWrapper>
              </div>
            </Column>
            <ColumnsWrapper>{product && product.thumbnail && <img src={product.thumbnail} alt='' />}</ColumnsWrapper>
          </ColumnsWrapper>
        </Center>
      </Bg>
    </motion.div>
  )
}
