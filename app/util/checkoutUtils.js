// utils/checkoutUtils.js

import axios from 'axios'

export async function goToPayment({ name, email, city, postalCode, streetAddress, country, cart }) {
  try {
    const response = await axios.post('/api/checkout', {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cart,
    })
    if (response.data.url) {
      window.location = response.data.url
    }
  } catch (error) {
    console.error('Payment failed', error)
  }
}
