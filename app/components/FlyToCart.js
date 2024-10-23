export default function flyToCart(e, whiteBoxElement) {
  const productRect = whiteBoxElement.getBoundingClientRect() // Get the dimensions of the product
  const cartIcon = document.querySelector('.cart-icon') // Select the cart icon

  if (!cartIcon) return // If cart icon does not exist, exit

  // Clone the WhiteBox element to animate
  const flyingBox = whiteBoxElement.cloneNode(true)
  document.body.appendChild(flyingBox)

  // Set initial position and styles of the flying element
  flyingBox.style.position = 'fixed'
  flyingBox.style.top = `${productRect.top}px`
  flyingBox.style.left = `${productRect.left}px`
  flyingBox.style.width = `${productRect.width}px`
  flyingBox.style.height = `${productRect.height}px`
  flyingBox.style.transition = 'all 1s ease'
  flyingBox.style.zIndex = '9999'
  flyingBox.style.pointerEvents = 'none'

  // Calculate the destination position (cart icon's position)
  const cartRect = cartIcon.getBoundingClientRect()
  const destX = cartRect.left + cartRect.width / 2 - productRect.width / 2 // Adjust for horizontal centering
  const destY = cartRect.top + cartRect.height / 2 - productRect.height / 2 // Adjust for vertical centering

  // Trigger the animation by changing the position and size
  requestAnimationFrame(() => {
    flyingBox.style.top = `${destY}px` // Move to the cart icon's Y position
    flyingBox.style.left = `${destX}px` // Move to the cart icon's X position
    flyingBox.style.transform = 'scale(0.2)' // Adjust scale as needed
    flyingBox.style.opacity = '0' // Fade out for smooth transition
  })

  // Remove the flying box after animation completes
  flyingBox.addEventListener('transitionend', () => {
    flyingBox.remove()
  })
}
