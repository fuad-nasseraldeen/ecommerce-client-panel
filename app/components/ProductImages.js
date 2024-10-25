import styled from 'styled-components'
import { useState } from 'react'

// Styled components
const ImageContainer = styled.div`
  margin-top: 50px;
  background-color: #f9fafb;
  border-radius: 1rem;
  padding: 1.5rem;
  height: 350px;
  overflow: hidden;
`

const BigImage = styled.img`
  max-width: 100%;
  max-height: 250px;
`

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;
`

const ImageButton = styled.div`
  border: 2px solid #0d3d29;
  border-color: ${(props) => (props.$active ? '#ccc' : 'transparent')};
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
`

const ThumbnailImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const BigImageWrapper = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 1s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0])

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
