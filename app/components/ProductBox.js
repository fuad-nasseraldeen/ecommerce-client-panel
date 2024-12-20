import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import flyToCart from './FlyToCart'
import StarRating from '@/app/icons/StarRating'
import MoreDetails from '@/app/icons/MoreDetails'
import ResponsiveDiscountStar from '@/app/components/ResponsiveDiscountStart'
import Loading from '@/app/components/Loading'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../redux/cartActions'
import Center from '@/app/components/Center'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const ProductWrapper = styled.div`
  text-decoration: none;
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #ddd;
  transition: all 0.3s ease-in-out;
  position: relative;
  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    img {
      transform: scale(1.1);
    }
    .overlay {
      opacity: 1;
    }
    .title:hover {
      color: #2563eb;
    }
  }
`

const ImageContainer = styled.div`
  position: relative;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 250px;

  img {
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .overlay button {
    background-color: white;
    border: none;
    margin: 0 5px;
    padding: 10px;
    border-radius: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
      background-color: #ccc;
    }
  }
`

const Title = styled(Link)`
  display: flex;
  align-items: center; /* Centers vertically */
  justify-content: center; /* Centers horizontally */
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  height: 3.5rem;
`

const ProductInfoBox = styled.div`
  padding: 16px;
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`

const Price = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #2563eb;
`

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-start;
  span {
    font-size: 1rem;
    font-weight: 600;
    color: #fbbf24;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25%;
`
const MoreDetailsHref = styled(Link)`
  text-decoration: none;
`

export default function ProductBox({ product }) {
  const { _id, title, price, images, rating, discountPercentage } = product
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const url = '/product/' + _id
  const whiteBoxRef = useRef(null)

const addToCart = async (e) => {
  NProgress.start()
  flyToCart(e, whiteBoxRef.current)

await new Promise((resolve) => {
  setTimeout(resolve, 1000)
})

  dispatch(addProductToCart(product))
  NProgress.done()
}


  const goToProductSpecification = () => {
    setIsLoading(true)
    NProgress.start()
    setTimeout(() => {
      NProgress.done()
      setIsLoading(false)
    }, 1000)
  }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <ProductWrapper>
        {isLoading && <Loading/>}
        <ImageContainer>
          <img ref={whiteBoxRef} src={images[0]} alt={title} />
          <ButtonContainer className='overlay'>
            <button onClick={(e) => addToCart(e)}><span>&#128722;</span>add to cart</button>
            <MoreDetailsHref href={url}>
              <button onClick={goToProductSpecification}>
                <MoreDetails /> more details
              </button>
            </MoreDetailsHref>
          </ButtonContainer>
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
