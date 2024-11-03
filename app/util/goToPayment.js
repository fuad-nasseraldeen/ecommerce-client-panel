export async function goToPayment() {
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
  }