export default function flyToCart(e, whiteBoxElement) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  try {
    const cartIcon = document.querySelector('.cart-icon') // Select the cart icon
    if (!cartIcon || typeof cartIcon.getBoundingClientRect !== 'function') return

    const fallbackElement =
      e?.currentTarget?.closest?.('[data-fly-source]') ||
      e?.currentTarget?.closest?.('article') ||
      e?.currentTarget?.closest?.('button') ||
      e?.currentTarget

    const sourceElement =
      whiteBoxElement && typeof whiteBoxElement.getBoundingClientRect === 'function' ? whiteBoxElement : fallbackElement

    if (!sourceElement || typeof sourceElement.getBoundingClientRect !== 'function') return

    const productRect = sourceElement.getBoundingClientRect()
    const cartRect = cartIcon.getBoundingClientRect()

    // Clone the source element to animate
    const flyingBox = sourceElement.cloneNode?.(true)
    if (!flyingBox) return
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
    const destX = cartRect.left + cartRect.width / 2 - productRect.width / 2
    const destY = cartRect.top + cartRect.height / 2 - productRect.height / 2

    // Trigger the animation by changing the position and size
    requestAnimationFrame(() => {
      flyingBox.style.top = `${destY}px`
      flyingBox.style.left = `${destX}px`
      flyingBox.style.transform = 'scale(0.2)'
      flyingBox.style.opacity = '0'
    })

    // Remove the flying box after animation completes
    flyingBox.addEventListener('transitionend', () => {
      flyingBox.remove()
    })

    // Fallback cleanup in case transitionend doesn't fire
    setTimeout(() => flyingBox.remove(), 1300)
  } catch (error) {
    console.error('flyToCart animation skipped:', error)
  }
}
