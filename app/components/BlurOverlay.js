import styled from 'styled-components'

const BlurOverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px);
  z-index: 11;
  background: rgba(245, 249, 255, 0.52);
`

export const BlurOverlay = () => {
  return <BlurOverlayContainer />
}
