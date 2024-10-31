import styled from 'styled-components'
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 100px;
`

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`

export default function ThankYouMessage() {
    return (
      <ColumnsWrapper>
        <Box>
          <h1>Thanks for your order!</h1>
          <p>We will email you when your order will be sent.</p>
        </Box>
      </ColumnsWrapper>
    )
  }
