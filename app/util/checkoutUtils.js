// utils/checkoutUtils.js
export function handleDisabledProceedToCheckout({ name, email, city, postalCode, streetAddress, country }) {
  return !name || !email || !city || !postalCode || !streetAddress || !country
}
