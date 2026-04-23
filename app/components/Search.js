import styled from 'styled-components'
import SearchIcon from '@/app/icons/Search'

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 680px;
`

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 999px;
  height: 52px;
  padding: 0 1rem 0 2.8rem;
  color: var(--text-primary);
  background: #fff;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.14);
  }
`

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #5b6a7b;
  display: inline-flex;

  svg {
    width: 20px;
    height: 20px;
  }
`

export default function Search({ onSearch }) {
  return (
    <SearchContainer>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <SearchInput
        type='text'
        placeholder='Search by title, brand, or tags'
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchContainer>
  )
}
