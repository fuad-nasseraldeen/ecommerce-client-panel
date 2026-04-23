import styled from 'styled-components'
import Button from '@/app/components/Button'

const Box = styled.div`
  background-color: #fff7f7;
  border-radius: var(--radius-sm);
  border: 1px solid #f3c0bf;
  padding: 1rem;
`
export default function RetryMessage({ onRetry }) {
  return (
    <Box>
      <p style={{ color: '#b42318', marginBottom: '0.55rem' }}>Error fetching data. Please try again.</p>
      <Button $black $block onClick={onRetry}>
        Try Again
      </Button>
    </Box>
  )
}
