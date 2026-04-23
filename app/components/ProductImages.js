import styled from 'styled-components'
import { useState, useEffect } from 'react'

// Styled components
const ImageContainer = styled.div`
  background-color: #f8fbff;
  border: 1px solid #deebf7;
  border-radius: 1rem;
  padding: 1rem;
  min-height: 300px;
  overflow: hidden;
`

const BigImage = styled.img`
  max-width: 100%;
  max-height: 240px;
`

const ImageButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.1rem;
`

const ImageButton = styled.div`
  border: 2px solid #0d3d29;
  border-color: ${(props) => (props.$active ? 'var(--brand)' : 'transparent')};
  height: 44px;
  width: 44px;
  padding: 2px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`

const ThumbnailImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const BigImageWrapper = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState('')
  
  useEffect(() => {
    if (images?.length > 0 ) setActiveImage(images?.[0])
  }, [images])

  return (
    <ImageContainer>
      <BigImageWrapper>
        <BigImage src={activeImage} alt='Active Product' />
      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image, index) => (
          <ImageButton key={index} $active={image === activeImage} onClick={() => setActiveImage(image)}>
            <ThumbnailImage src={image} alt={`Thumbnail ${index + 1}`} />
          </ImageButton>
        ))}
      </ImageButtons>
    </ImageContainer>
  )
}
