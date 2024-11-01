// utils/checkoutUtils.js
export function handleDisabledProceedToCheckout(details) {
  return Object.values(details).some((field) => !field) || !isValidEmail(details.email);
}
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}