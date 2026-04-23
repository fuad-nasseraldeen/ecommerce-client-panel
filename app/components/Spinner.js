import styled from 'styled-components'

const Spinner = styled.div`
  border: 4px solid rgba(15, 118, 110, 0.18);
  border-left-color: var(--brand);
  border-radius: 50%;
  width: 52px;
  height: 52px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoadingIndicator = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )
}
