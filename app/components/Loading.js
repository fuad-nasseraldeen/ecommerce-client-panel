import { BlurOverlay } from '@/app/components/BlurOverlay'
import { LoadingIndicator } from '@/app/components/Spinner'
import styled from 'styled-components'
const wrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;`
export default function Loading() {
  return (
      <wrapper>
        <BlurOverlay />
        <LoadingIndicator />
      </wrapper>
  )
}