'use client'
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

import Like from '@/app/icons/Like'
import Dislike from '@/app/icons/Dislike'
import Rating from '@/app/components/Rating'
import FormatedDate from '@/app/util/FormatedDate'
import Button from '@/app/components/Button'
import NewCommentForm from '@/app/components/newCommentForm'

const ReviewWrapper = styled.div`
  background-color: #ebf1ef;
  border-radius: 0.5rem;
  @media screen and (min-width: 768px) {
    padding: 1rem 2rem;
  }
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`

const ReviewItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 40px;
  padding-left: 10px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
  gap: 40px;
  margin: 40px 0;
`

const ReviewDetails = styled.div`
  h5 {
    font-weight: 500;
    margin: 0.25rem 0;
  }
  p {
    font-size: 0.875rem;
    color: #23262f;
    opacity: 0.75;
  }
`

const ReviewContent = styled.div`
  margin-bottom: 1.5rem;
`

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    gap: 4px;
    border: none;
    display: flex;
    align-items: baseline;
    margin-right: 1rem;
    background: none;
    padding: 1rem;
    border-radius: 0.375rem;
    border: 15px;
    &:hover {
      background-color: #f1f5f9;
    }
  }
`

const ReviewContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Hr = styled.hr`
  height: 1px;
  background-color: #ccc;
  border: none;
  ${(props) =>
    props.$last &&
    css`
      display: none;
    `}
`

export default function Review({ reviews, productId }) {
  const [reviewsState, setReviewsState] = useState([])

  useEffect(() => {
    if (reviews?.length > 0) {
      const sortReviewsByDate = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date))
      setReviewsState(sortReviewsByDate)
    }
  }, reviews)
  async function handleLikeOnClick(reviewId) {
    try {
      const response = await axios.post('/api/review/like', { reviewId, productId })
      if (response.status === 201) {
        const updatedReview = response.data
        setReviewsState((prevReviews) =>
          prevReviews.map((review) => (review._id === reviewId ? { ...review, like: updatedReview.like } : review)),
        )
      }
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  // Handle dislike update
  async function handleDislikeOnClick(reviewId) {
    try {
      const response = await axios.post('/api/review/dislike', { reviewId, productId })
      if (response.status === 201) {
        const updatedReview = response.data
        setReviewsState((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, dislike: updatedReview.dislike } : review,
          ),
        )
      }
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }
  const handleNewReviewAdded = (newReview) => {
    setReviewsState((prevReviews) => [newReview, ...prevReviews].sort((a, b) => new Date(b.date) - new Date(a.date)))
  }
  // Review Item component
  const ReviewItem = ({ review }) => {
    return (
      <ReviewItemWrapper>
        <div>
          <h5>{review.reviewerName}</h5>
          <Rating rating={review.rating} />
          <ReviewDetails>
            <p>Comment At</p>
            <FormatedDate date={review.date} />
          </ReviewDetails>
        </div>
        <ReviewContentWrapper>
          <ReviewContent>{review.comment}</ReviewContent>
          <ActionButtons>
            <button onClick={() => handleLikeOnClick(review._id)}>
              <Like /> Like ({review.like})
            </button>
            <button onClick={() => handleDislikeOnClick(review._id)}>
              <Dislike /> Dislike ({review.dislike})
            </button>
          </ActionButtons>
        </ReviewContentWrapper>
      </ReviewItemWrapper>
    )
  }

  return (
    <ReviewWrapper>
      <ReviewHeader>
        <h2>Customer Review</h2>
      </ReviewHeader>
      <NewCommentForm productId={productId} onNewReviewAdded={handleNewReviewAdded} />
      {reviewsState.map((review, i) => (
        <div key={i}>
          <ReviewItem review={review} />
          <Hr $last={i === reviewsState.length - 1} />
        </div>
      ))}
    </ReviewWrapper>
  )
}
