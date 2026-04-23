import styled from 'styled-components'
import Center from '@/app/components/Center'
import ButtonLink from '@/app/components/ButtonLink'

const Wrapper = styled.section`
  padding: 3rem 0;
`

const Box = styled.div`
  background-color: #fff;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  padding: 1.4rem;
  max-width: 640px;
  margin: 0 auto;
`

const Heading = styled.h1`
  margin-bottom: 0.5rem;
`

const Description = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
`

export default function ThankYouMessage() {
  return (
    <Wrapper>
      <Center>
        <Box>
          <Heading>Thanks for your order!</Heading>
          <Description>We will email you once your order is shipped.</Description>
          <ButtonLink href='/' $black>
            Continue shopping
          </ButtonLink>
        </Box>
      </Center>
    </Wrapper>
  )
}
