'use client'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  @media (min-width: 1024px) {
    width: min(1180px, calc(100% - 4rem));
  }
`

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>
}
