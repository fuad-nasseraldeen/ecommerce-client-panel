import styled from 'styled-components'
import StarRating from '@/icons/StarRating'
import HalfStarRating from '@/icons/HalfStarRating'
import { Fragment } from 'react'

const RatingContainer = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`

const StarContainer = styled.span`
  color: #eab308;
`

const RatingValue = styled.span`
  margin-left: 0.25rem;
  margin-right: 0.25rem;
`

const Rating = ({ rating }) => (
  <RatingContainer>
    <StarContainer>
      {[...Array(5)].map((_, i) => {
        const index = i + 1
        let content = ''
        if (index <= Math.floor(rating)) content = <StarRating />
        else if (rating > i && rating < index + 1) content = <HalfStarRating />
        else if (index > rating) content = <StarRating />

        return <Fragment key={i}>{content}</Fragment>
      })}
    </StarContainer>
    <RatingValue>{rating.toFixed(1)}</RatingValue>
  </RatingContainer>
)

export default Rating
