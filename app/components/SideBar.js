import styled from 'styled-components'
import { sortByOptions } from '@/app/util/util'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const SidebarWrapper = styled.div`
  display: none; /* Hide sidebar by default */

  @media screen and (min-width: 768px) {
    display: block; /* Show sidebar for larger screens */
  }
`

const SidebarContainer = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-right: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
`

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
`

const SortOptionList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const SortOptionItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  input[type='radio'] {
    margin-right: 10px;
  }

  label {
    font-size: 1rem;
  }
`

export default function Sidebar({ handleSortChange, handleCategorySort }) {
  const [selectedSort, setSelectedSort] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const categories = useSelector((state) => state.products.categories)

  const handleSort = (e) => {
    const { value } = e.target
    setSelectedSort(value)
    handleSortChange(value)
  }

  const handleCategory = (e) => {
    const { value } = e.target
    setSelectedCategory(value)
    handleCategorySort(value)
  }

  return (
    <SidebarWrapper>
      <SidebarContainer>
        <FilterTitle>Sort By</FilterTitle>
        <SortOptionList>
          {sortByOptions?.map((option) => (
            <SortOptionItem key={option.id}>
              <input
                type='radio'
                id={option.id}
                name='sort'
                value={option.id}
                checked={selectedSort.length > 0 ? selectedSort === option.id : option.checked}
                onChange={handleSort}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </SortOptionItem>
          ))}
        </SortOptionList>
      </SidebarContainer>
      <SidebarContainer>
        <FilterTitle>Sort By Category</FilterTitle>
        <SortOptionList>
          {categories?.map((category) => (
            <SortOptionItem key={category._id}>
              <input
                type='radio'
                id={category._id}
                name='category'
                value={category._id}
                checked={selectedCategory === category._id}
                onChange={handleCategory}
              />
              <label htmlFor={category._id}>{category.name}</label>
            </SortOptionItem>
          ))}
        </SortOptionList>
      </SidebarContainer>
    </SidebarWrapper>
  )
}
