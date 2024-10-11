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
`

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`
const Columns = styled.div`
  display: flex;
  align-items: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 35px 0px;
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
          <Columns>
            <div>
              <Title>{product?.title}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/products/' + product?._id} $white $outline>
                  Read More
                </ButtonLink>
                <Button $white onClick={handleAddFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Columns>
          <Columns>
            {product &&
              product.images &&
              product.images.map((image, index) => {
                return (
                  <div key={index}>
                    <img src={image} alt='' />
                  </div>
                )
              })}
          </Columns>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}
