export const categoriesImg = [
  { img: '/categories/tablets.png', name: 'tablets' },
  { img: '/categories/smartphones.png', name: 'smartphones' },
  { img: '/categories/mobile-accessories.png', name: 'mobile-accessories' },
  { img: '/categories/mens-watches.png', name: 'mens-watches' },
  { img: '/categories/laptops.png', name: 'laptops' },
  { img: '/categories/fragrances.png', name: 'fragrances' },
  { img: '/categories/sports-accessories.png', name: 'sports-accessories' },
]

export const sortByOptions = [
  { id: 'sort1', label: 'title', sortName: 'title' },
  { id: 'sort2', label: 'Brand', sortName: 'brand', checked: true },
  { id: 'sort4', label: 'Average rating', sortName: 'rating' },
  { id: 'sort5', label: 'Price: Low to High', sortName: 'price', asc: true },
  { id: 'sort6', label: 'Price: High to Low', sortName: 'price', asc: false },
]

// Apply sorting logic
export const applySort = (productsToSort, sortOption) => {
  const productsCopy = [...productsToSort]
  const selectedSortOption = sortByOptions.find((option) => option.id === sortOption)

  if (!selectedSortOption) return productsCopy

  const { sortName, asc } = selectedSortOption

  switch (sortName) {
    case 'title':
      return productsCopy.sort((a, b) => a.title.localeCompare(b.title))
    case 'brand':
      return productsCopy.sort((a, b) => a.brand.localeCompare(b.brand))
    case 'price':
      return asc ? productsCopy.sort((a, b) => a.price - b.price) : productsCopy.sort((a, b) => b.price - a.price)
    case 'rating':
      return productsCopy.sort((a, b) => b.rating - a.rating)
    case 'createdAt':
      return productsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    default:
      return productsCopy
  }
}
