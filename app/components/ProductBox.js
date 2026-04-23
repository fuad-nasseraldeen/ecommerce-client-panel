import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import flyToCart from './FlyToCart'
import StarRating from '@/app/icons/StarRating'
import MoreDetails from '@/app/icons/MoreDetails'
import ResponsiveDiscountStar from '@/app/components/ResponsiveDiscountStart'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../redux/cartActions'

const ProductWrapper = styled.article`
  text-decoration: none;
  background-color: #fff;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);

    img {
      transform: scale(1.04);
    }

    .overlay {
      opacity: 1;
    }
  }
`

const ImageContainer = styled.div`
  position: relative;
  background: linear-gradient(180deg, #f9fbff 0%, #f1f6fd 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 240px;

  img {
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.35s ease;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(7, 18, 31, 0.52);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.22s ease;
  }
`

const OverlayButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  color: #13253a;
  font-weight: 600;

  &:hover {
    background-color: #eef3fa;
  }
`

const MoreDetailsHref = styled(Link)`
  text-decoration: none;
`

const ProductInfoBox = styled.div`
  padding: 0.9rem 0.95rem 1rem;
`

const Title = styled(Link)`
  display: block;
  font-weight: 700;
  font-size: 1rem;
  text-align: left;
  color: #223040;
  text-decoration: none;
  line-height: 1.35;
  min-height: 2.65rem;

  &:hover {
    color: var(--brand);
  }
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.7rem;
`

const Price = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--brand-strong);
`

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.28rem;

  span {
    font-size: 0.9rem;
    font-weight: 600;
    color: #f59e0b;
  }
`

export default function ProductBox({ product }) {
  const { _id, title, price, images, rating, discountPercentage } = product
  const dispatch = useDispatch()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const url = '/product/' + _id
  const whiteBoxRef = useRef(null)

  const addToCart = (e) => {
    flyToCart(e, whiteBoxRef.current)
    dispatch(addProductToCart(product))
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.32 }}
    >
      <ProductWrapper>
        <ImageContainer>
          <img ref={whiteBoxRef} src={images?.[0]} alt={title} loading='lazy' />
          <div className='overlay'>
            <OverlayButton onClick={addToCart}>
              <span>&#128722;</span>
              Add
            </OverlayButton>
            <MoreDetailsHref href={url}>
              <OverlayButton>
                <MoreDetails />
                Details
              </OverlayButton>
            </MoreDetailsHref>
          </div>
        </ImageContainer>

        <ResponsiveDiscountStar discountPercentage={discountPercentage} />

        <ProductInfoBox>
          <Title href={url}>{title}</Title>
          <PriceRow>
            <Price>${price}</Price>
            <RatingRow>
              <StarRating />
              <span>{rating}</span>
            </RatingRow>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    </motion.div>
  )
}
