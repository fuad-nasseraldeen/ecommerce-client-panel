import styled from 'styled-components'

const BlurOverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(8px);
  z-index: 11;
  background: rgba(255, 255, 255, 0.5);
`

export const BlurOverlay = () => {
  return <BlurOverlayContainer />
}
