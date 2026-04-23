'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Route error:', error)
  }, [error])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
      <h2>Something went wrong</h2>
      <p>Please try refreshing the page.</p>
      <button onClick={() => reset()} style={{ marginTop: '1rem', padding: '0.5rem 0.9rem', cursor: 'pointer' }}>
        Try again
      </button>
    </div>
  )
}
