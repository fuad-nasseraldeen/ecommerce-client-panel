import React, { useEffect, useState } from 'react'
import DiscountStar from '@/icons/DiscountStar'
import styled from 'styled-components'

const DiscountStarWrapper = styled.div`
  position: relative;
  display: inline-block;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: white;
    font-weight: bold;
  }
`
const DiscountStarContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
`
export default function ResponsiveDiscountStar({ discountPercentage }) {
  const [starSize, setStarSize] = useState('64px')

  const updateStarSize = () => {
    if (window.innerWidth < 768) {
      setStarSize('48px')
    } else {
      setStarSize('64px')
    }
  }

  useEffect(() => {
    // Set initial size
    updateStarSize()

    window.addEventListener('resize', updateStarSize)

    return () => {
      window.removeEventListener('resize', updateStarSize)
    }
  }, [])

  return (
    <>
      {parseInt(discountPercentage) > 0 && (
        <DiscountStarContainer>
          <DiscountStarWrapper>
            <DiscountStar size={starSize} />
            <span>{parseInt(discountPercentage)}%</span>
          </DiscountStarWrapper>
        </DiscountStarContainer>
      )}
    </>
  )
}
