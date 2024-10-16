'use client'

import { useContext } from 'react'
import { CartContext } from '@/app/components/CartContext'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import Button from '@/app/components/Button'
import ButtonLink from '@/app/components/ButtonLink'
import CartIcon from '@/icons/CartIcon'

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
    max-width: 100%;
    max-height: 200px;
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
      max-width: 100%;
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
  const { addProduct } = useContext(CartContext)
  function handleAddFeaturedToCart() {
    addProduct(product._id)
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.title}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/product/' + product?._id} $white $outline>
                  Read More
                </ButtonLink>
                <Button $white onClick={handleAddFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <ColumnsWrapper>
            {product &&
              product.images &&
              product.images.map((image, index) => {
                return (
                  <div key={index}>
                    <img src={image} alt='' />
                  </div>
                )
              })}
          </ColumnsWrapper>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}
