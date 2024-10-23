'use client'
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Button from './Button'

const FormWrapper = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
`

const FormField = styled.div`
  margin-bottom: 1rem;
  label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }
`

export default function NewCommentForm({ productId, onNewReviewAdded }) {
  const [reviewerName, setReviewerName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await axios.post('/api/review/new', {
        productId,
        reviewerName,
        reviewerEmail: reviewerName.split(' ').pop() + '@gmail.com',
        rating,
        comment,
      })

      if (response.status === 201) {
        const newReview = response.data
        onNewReviewAdded(newReview) // Update the parent component with the new review
        // Clear the form after submission
        setReviewerName('')
        setRating(0)
        setComment('')
      }
    } catch (error) {
      setError('Failed to add the comment.')
      console.error('Error adding comment:', error)
    }
  }

  return (
    <FormWrapper>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor='reviewerName'>Your Name</label>
          <input
            type='text'
            id='reviewerName'
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <label htmlFor='rating'>Rating</label>
          <input
            type='number'
            id='rating'
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min='1'
            max='5'
            required
          />
        </FormField>
        <FormField>
          <label htmlFor='comment'>Comment</label>
          <textarea
            id='comment'
            rows='4'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </FormField>
        <Button $primary type='submit'>
          Submit Review
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </FormWrapper>
  )
}
