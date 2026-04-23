import styled from 'styled-components'
import { sortByOptions } from '@/app/util/util'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const SidebarWrapper = styled.aside`
  display: none;

  @media screen and (min-width: 900px) {
    display: block;
  }
`

const SidebarContainer = styled.section`
  background-color: #fff;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin-bottom: 0.9rem;
  box-shadow: var(--shadow-sm);
`

const FilterTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 0.65rem;
`

const SortOptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const SortOptionItem = styled.li`
  margin-bottom: 0.58rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type='radio'] {
    accent-color: var(--brand);
    margin: 0;
  }

  label {
    font-size: 0.92rem;
    color: var(--text-secondary);
    cursor: pointer;
  }
`

export default function Sidebar({ handleSortChange, handleCategorySort }) {
  const [selectedSort, setSelectedSort] = useState('sort1')
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
        <FilterTitle>Sort</FilterTitle>
        <SortOptionList>
          {sortByOptions?.map((option) => (
            <SortOptionItem key={option.id}>
              <input
                type='radio'
                id={option.id}
                name='sort'
                value={option.id}
                checked={selectedSort === option.id}
                onChange={handleSort}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </SortOptionItem>
          ))}
        </SortOptionList>
      </SidebarContainer>

      <SidebarContainer>
        <FilterTitle>Category</FilterTitle>
        <SortOptionList>
          <SortOptionItem key='all-categories'>
            <input
              type='radio'
              id='all-categories'
              name='category'
              value=''
              checked={selectedCategory === ''}
              onChange={handleCategory}
            />
            <label htmlFor='all-categories'>All categories</label>
          </SortOptionItem>
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
