export const getRandomProduct = (products) => {
  const randomIndex = Math.floor(Math.random() * (products.length - 1 + 1)) + 1

  return products[randomIndex]
}
