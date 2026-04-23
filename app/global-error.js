'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global app error:', error)
  }, [error])

  return (
    <html lang='en'>
      <body style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
        <h2>Application error</h2>
        <p>An unexpected error occurred.</p>
        <button onClick={() => reset()} style={{ marginTop: '1rem', padding: '0.5rem 0.9rem', cursor: 'pointer' }}>
          Retry
        </button>
      </body>
    </html>
  )
}
