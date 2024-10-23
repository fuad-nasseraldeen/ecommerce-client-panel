import styled from 'styled-components'
import SearchIcon from '@/icons/Search'
// Styled components for the search bar
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  max-width: 500px;
  border: none;
  border-bottom: 1px solid #ced4da;
  padding-left: 30px;
  letter-spacing: 1px;
  position: relative;
  height: 60px;
  border-radius: 120px;
  margin: 0 auto;
`
const IconWrapper = styled.div``
export default function Search({ onSearch }) {
  return (
    <SearchContainer>
      {/* <SearchIcon /> */}
      <SearchInput
        type='text'
        placeholder='Search by title, brand, or tags...'
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchContainer>
  )
}
