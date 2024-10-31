import styled from 'styled-components'
import Button from '@/app/components/Button'

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`
export default function RetryMessage({ onRetry }) {
  return (
    <Box>
      <p style={{ color: 'red' }}>Error Fetching Data. Please try again.</p>
      <Button $black $block onClick={onRetry}>
        Try Again
      </Button>
    </Box>
  )
}